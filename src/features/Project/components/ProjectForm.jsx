import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import BackdropProgress from 'components/BackdropProgress';
import InputField from 'components/form-controls/InputFieldOutLined';
import SelectField from 'components/form-controls/SelectField';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import useProjectCategory from '../hooks/useProjectCategory';
import { updateProject } from '../projectSlice';

export default function ProjectForm({ onSubmit, onSubmitEdit, editedProject, isCreating = false }) {
  const { updateLoading } = useSelector((state) => state.projectReducer);

  const dispatch = useDispatch();

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
    reset,
  } = form;

  const [projectCategories] = useProjectCategory();

  useEffect(() => {
    if (editedProject) {
      reset({
        projectName: editedProject.projectName,
        description: editedProject.description,
        categoryId: editedProject.categoryId,
      });
    } else {
      reset({
        projectName: '',
        description: '',
        categoryId: '',
      });
    }
  }, [editedProject, reset]);

  const handleEditorChange = (content, editor) => {
    form.setValue('description', content, { shouldValidate: true, shouldDirty: true });
  };

  const handleSubmitForm = async (values) => {
    if (editedProject) {
      const projectUpdate = { ...values, id: editedProject.id, creator: editedProject.creator.id };
      dispatch(updateProject(projectUpdate));
    } else {
      if (onSubmit) {
        onSubmit(values);
        reset({
          projectName: '',
          description: '',
          categoryId: '',
        });
      }
    }
  };

  return (
    <Box component="form" onSubmit={form.handleSubmit(handleSubmitForm)} noValidate sx={{ mt: 1 }}>
      <InputField name="projectName" label="Project Name" form={form} />
      <Box sx={{ my: 3 }}>
        <Typography>Description</Typography>
        <Editor
          initialValue={editedProject ? editedProject.description : ''}
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
      <BackdropProgress isOpen={updateLoading} />
    </Box>
  );
}
