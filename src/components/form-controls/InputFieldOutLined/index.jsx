import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { formState, control } = form;
  const { errors } = formState;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          size="medium"
          error={!!errors[name]?.message}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
}

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
