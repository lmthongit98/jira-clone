import { MenuItem, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

function SelectField(props) {
  const { form, name, label, items } = props;
  const { formState, control } = form;
  const { errors } = formState;
  const hasError = !!errors[name];

  return (
    <FormControl error={hasError} margin="normal" fullWidth variant="standard">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField {...field} select fullWidth label={label} error={hasError} helperText={errors[name]?.message}>
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.projectCategoryName}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </FormControl>
  );
}

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  items: PropTypes.array,
};

export default SelectField;
