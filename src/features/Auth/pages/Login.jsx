import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import {
  default as InputField,
  default as PasswordField,
} from "../../../components/form-controls/InputField";

export default function Login() {
  const handleSubmitLoginForm = (values) => {
    console.log("login", values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string().required("Password is required!"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={form.handleSubmit(handleSubmitLoginForm)}
          noValidate
          sx={{ mt: 1 }}
        >
          <InputField name="email" label="Email" form={form} />
          <PasswordField name="password" label="Password" form={form} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
