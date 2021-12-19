import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectField({ name, control, label, names, ...inputProps }) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        size="small"
        multiple
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        input={<OutlinedInput label={label} />}
        error={invalid}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={'ahihi'} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
