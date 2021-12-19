import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

export default function InputFieldStandard({ name, control, label, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      fullWidth
      value={value}
      label={label}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
