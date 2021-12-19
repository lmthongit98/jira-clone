import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import BackdropProgress from 'components/BackdropProgress';
import InputFieldOutLined from 'components/form-controls/InputFields/InputFieldOutLined';
import SelectField from 'components/form-controls/SelectField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import useProjectCategory from '../hooks/useProjectCategory';

export default function ProjectForm({
  onSubmit,
  initialValue = { projectName: '', description: '', categoryId: '' },
  loading,
  setOpen,
}) {
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required('Email is required!'),
    description: Yup.string().required('Description is required!'),
    categoryId: Yup.string().required('Category is required!'),
  });

  const {
    formState: { errors },
    control,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
  });

  const [projectCategories] = useProjectCategory();

  const handleEditorChange = (content, editor) => {
    setValue('description', content, { shouldValidate: true, shouldDirty: true });
  };

  const handleSubmitForm = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} noValidate sx={{ mt: 1 }}>
      <InputFieldOutLined name="projectName" label="Project name" control={control} />
      <Box sx={{ my: 3 }}>
        <Typography>Description</Typography>
        <Editor
          initialValue={initialValue?.description}
          apiKey="088k00pywypmab32s73wfelfhll22yz3asentq9oq3vb46q0"
          init={{
            selector: 'textarea#myTextArea',
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={handleEditorChange}
        />
        <FormHelperText error={!!errors['description']}>{errors['description']?.message}</FormHelperText>
      </Box>
      <SelectField name="categoryId" label="Category" control={control} options={projectCategories} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="button" onClick={() => setOpen(false)} variant="outlined" sx={{ mt: 1, mb: 2, mr: 1 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
          Submit
        </Button>
      </Box>
      <BackdropProgress isOpen={loading} />
    </Box>
  );
}
