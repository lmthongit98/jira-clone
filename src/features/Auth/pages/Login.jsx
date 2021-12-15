import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, Container, Grid, LinearProgress, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { unwrapResult } from '@reduxjs/toolkit';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { login } from '../userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogging, setIsLogging] = useState(false);

  const handleSubmitLoginForm = async (values) => {
    try {
      setIsLogging(true);
      const action = login(values);
      const resultACtion = await dispatch(action);
      const user = unwrapResult(resultACtion);
      navigate('/project');
    } catch (error) {
      console.log('Fail to login', error);
      toast.error('Email or password is incorrect!');
    } finally {
      setIsLogging(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required!').email('Email is invalid!'),
    password: Yup.string().required('Password is required!'),
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Container component="main" maxWidth sx={{ mt: 5 }}>
      {isLogging && <LinearProgress />}

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={form.handleSubmit(handleSubmitLoginForm)} noValidate sx={{ mt: 1 }}>
          <InputField name="email" label="Email" form={form} />
          <PasswordField name="password" label="Password" form={form} />
          <Button disabled={isLogging} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
