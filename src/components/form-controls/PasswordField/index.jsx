import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const { formState, control } = form;
  const { errors } = formState;
  const hasError = !!errors[name];
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <FormControl error={hasError} margin="normal" fullWidth variant="standard">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />
      <FormHelperText error={hasError}>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default PasswordField;
