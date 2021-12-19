import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

function SelectField({ name, control, label, options, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      size="small"
      select
      fullWidth
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      value={value}
      label={label}
      error={invalid}
      helperText={error?.message}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.projectCategoryName}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default SelectField;
