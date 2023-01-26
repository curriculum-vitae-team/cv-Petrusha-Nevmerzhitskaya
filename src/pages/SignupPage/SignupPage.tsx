import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { authService } from '../../graphql/auth/authService';
import { ISignupResult } from '../../graphql/auth/IAuthResult';
import { IFormInput } from '../../graphql/auth/IFormInput';
import { SIGNUP } from '../../graphql/auth/mutation';
import { schema } from '../LoginPage/validationSchema';
import { FormAuth, PaperAuth } from './Signup.styles';

const SignupPage: FC = () => {
  const [signup, { loading }] = useMutation<ISignupResult>(SIGNUP);
  const navigate = useNavigate();
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
  const showPassword = () => {
    setHiddenPassword((el) => !el);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (input: IFormInput) => {
    const { data } = await signup({ variables: input });
    if (data) {
      authService.addUserToStorage(data.signup.user, data.signup.access_token);
      navigate('/employees');
    }
  };

  return (
    <PaperAuth elevation={24}>
      <Grid
        container
        direction="column"
        sx={{ p: 3, alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography sx={{ mb: 1 }} variant="h4">
          Register Now
        </Typography>
        <Typography>Welcome! Sign up to continue.</Typography>
        <FormAuth onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            sx={{ mt: 2, mb: 0.5 }}
            color="secondary"
            type="email"
            {...register('email')}
            helperText={errors.email?.message}
            error={!!errors.email}
          />

          <TextField
            fullWidth
            sx={{ mt: 2, mb: 0.5 }}
            label="Password"
            placeholder="Enter password"
            color="secondary"
            variant="outlined"
            type={hiddenPassword ? 'password' : 'text'}
            {...register('password')}
            helperText={errors.password?.message}
            error={!!errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ cursor: 'pointer' }}
                  onClick={showPassword}
                >
                  {hiddenPassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />

          <LoadingButton
            sx={{ mt: 2, backgroundColor: 'firebrick' }}
            size="large"
            fullWidth
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Loading…"
          >
            Sign up
          </LoadingButton>

          <Button
            sx={{ mt: 1, color: 'firebrick' }}
            fullWidth
            type="submit"
            variant="text"
            component={NavLink}
            to="/login"
          >
            Already registered?
          </Button>
        </FormAuth>
      </Grid>
    </PaperAuth>
  );
};

export default SignupPage;
