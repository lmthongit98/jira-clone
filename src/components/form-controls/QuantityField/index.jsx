import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { FormHelperText, IconButton, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

function QuantityField(props) {
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;
  const hasError = !!errors[name];

  return (
    <FormControl error={hasError} margin="normal" variant="outlined" size="small">
      <Typography> Quantity </Typography>
      <Controller
        name={name}
        control={form.control}
        render={(field) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              maxWidth: '150px',
            }}
          >
            <IconButton onClick={() => setValue(name, +field.value ? +field.value - 1 : 0)}>
              <RemoveCircleOutline />
            </IconButton>
            <Input {...field} id="quantity-field" type="number" />
            <IconButton onClick={() => setValue(name, +field.value + 1)}>
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText error={hasError}>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default QuantityField;
