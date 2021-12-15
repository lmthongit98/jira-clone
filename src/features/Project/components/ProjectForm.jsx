import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import InputField from 'components/form-controls/InputFieldOutLined';
import SelectField from 'components/form-controls/SelectField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export default function ProjectForm({ onSubmit, projectCategories = [], isCreating = false }) {
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required('Email is required!'),
    description: Yup.string().required('Description is required!'),
    categoryId: Yup.string().required('Category is required!'),
  });

  const form = useForm({
    defaultValues: {
      projectName: '',
      description: '',
      categoryId: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    formState: { errors },
  } = form;

  const handleEditorChange = (content, editor) => {
    form.setValue('description', content, { shouldValidate: true, shouldDirty: true });
  };

  const handleSubmitForm = async (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Box component="form" onSubmit={form.handleSubmit(handleSubmitForm)} noValidate sx={{ mt: 1 }}>
      <InputField name="projectName" label="Project Name" form={form} />
      <Box sx={{ my: 3 }}>
        <Typography>Description</Typography>
        <Editor
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
      <SelectField name="categoryId" label="Category" form={form} items={projectCategories} />
      <Button disabled={isCreating} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
