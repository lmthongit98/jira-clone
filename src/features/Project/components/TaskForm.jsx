import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormHelperText, Slider, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import InputFieldOutLined from 'components/form-controls/InputFields/InputFieldOutLined';
import SelectField from 'components/form-controls/SelectField';
import MultipleSelectField from 'components/MultipleSelectField';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { getAssignees } from '../projectSlice';

export default function TaskForm(props) {
  const dispatch = useDispatch();

  const { onSubmit, initialValue, setOpen, statuses, priorities, taskTypes, myProjects } = props;
  const { assignees } = useSelector((state) => state.projectReducer);

  const validationSchema = Yup.object().shape({
    projectId: Yup.string().required('Project is required!'),
    taskName: Yup.string().required('Task name is required!'),
    description: Yup.string().required('Description is required!'),
  });

  const {
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
  });

  const selectedProjectId = watch('projectId');
  let timeSpent = watch('timeTrackingSpent');
  timeSpent = +timeSpent;
  let timeRemaining = watch('timeTrackingRemaining');
  timeRemaining = +timeRemaining;

  useEffect(() => {
    dispatch(getAssignees(selectedProjectId));
  }, [selectedProjectId, dispatch]);

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
      <Box sx={{ my: 2 }}>
        <SelectField
          name="projectId"
          label="Project"
          control={control}
          options={myProjects.map((item) => ({ id: item.id, label: item.projectName, value: item.id }))}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <InputFieldOutLined name="taskName" label="Task name" control={control} />
      </Box>
      <Box sx={{ my: 2 }}>
        <SelectField
          name="statusId"
          label="Status"
          control={control}
          options={statuses.map((status) => ({
            id: status.statusId,
            label: status.statusName,
            value: status.statusId,
          }))}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '50%', my: 1, mr: 1 }}>
          <SelectField
            name="priorityId"
            label="Priority"
            control={control}
            options={priorities.map((item) => ({ id: item.priorityId, label: item.priority, value: item.priorityId }))}
          />
        </Box>
        <Box sx={{ width: '50%', my: 1, ml: 1 }}>
          <SelectField
            name="typeId"
            label="TaskType"
            control={control}
            options={taskTypes.map((item) => ({ id: item.id, label: item.taskType, value: item.id }))}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '50%', my: 1, mr: 1 }}>
          <MultipleSelectField
            name="listUserAsign"
            label="assignees"
            names={assignees.map((item) => ({ id: item.userId, label: item.name, value: item.userId }))}
            control={control}
          />
        </Box>
        <Box sx={{ width: '50%', my: 1, ml: 1 }}>
          <Typography variant="caption" id="input-slider" gutterBottom>
            Time tracking
          </Typography>
          <Slider value={timeSpent} max={timeSpent + timeRemaining} aria-label="Default" valueLabelDisplay="auto" />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">{timeSpent}h logged</Typography>
            <Typography variant="caption">{timeRemaining}h remaining</Typography>
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
        <Typography variant="caption">Description</Typography>
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="button" onClick={() => setOpen(false)} variant="outlined" sx={{ mt: 1, mb: 2, mr: 1 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
          Submit
        </Button>
      </Box>
      {/* <BackdropProgress isOpen={loading} /> */}
    </Box>
  );
}
