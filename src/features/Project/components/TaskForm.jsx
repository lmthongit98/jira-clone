import { Box, Button, Slider, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import BackdropProgress from 'components/BackdropProgress';
import InputFieldOutLined from 'components/form-controls/InputFields/InputFieldOutLined';
import SelectField from 'components/form-controls/SelectField';
import MultipleSelectField from 'components/MultipleSelectField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function TaskForm({ onSubmit, initialValue, loading, setOpen }) {
  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required('Email is required!'),
    description: Yup.string().required('Description is required!'),
    categoryId: Yup.string().required('Category is required!'),
  });

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  const {
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      listUserAsign: [0],
      taskName: '',
      description: '',
      statusId: '',
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: 0,
      typeId: 0,
      priorityId: 0,
    },
  });

  const handleEditorChange = (content, editor) => {
    setValue('description', content, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} noValidate sx={{ mt: 1 }}>
      <Box sx={{ my: 1 }}>
        <SelectField name="projectId" label="Project" control={control} options={[]} />
      </Box>
      <Box sx={{ my: 1 }}>
        <InputFieldOutLined name="taskName" label="Task name" control={control} />
      </Box>
      <Box sx={{ my: 1 }}>
        <SelectField name="statusId" label="Status" control={control} options={[]} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '50%', my: 1, mr: 1 }}>
          <SelectField name="projectId" label="Priority" control={control} options={[]} />
        </Box>
        <Box sx={{ width: '50%', my: 1, ml: 1 }}>
          <SelectField name="typeId" label="TaskType" control={control} options={[]} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '50%', my: 1, mr: 1 }}>
          <MultipleSelectField name="listUserAsign" label="assignees" names={names} control={control} />
        </Box>
        <Box sx={{ width: '50%', my: 1, ml: 1 }}>
          <Typography variant="caption" id="input-slider" gutterBottom>
            Time tracking
          </Typography>
          <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">1h logged</Typography>
            <Typography variant="caption">8h remaining</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '50%', my: 1, mr: 1 }}>
          <InputFieldOutLined type="number" name="originalEstimate" label="Original estimate" control={control} />
        </Box>
        <Box sx={{ width: '50%', display: 'flex', my: 1, mr: 1 }}>
          <Box sx={{ width: '50%', mr: 1 }}>
            <InputFieldOutLined type="number" name="timeTrackingSpent" label="Time spent" control={control} />
          </Box>
          <Box sx={{ width: '50%', ml: 1 }}>
            <InputFieldOutLined type="number" name="timeTrackingRemaining" label="Time remaining" control={control} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 1 }}>
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
      </Box>
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
