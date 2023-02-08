import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { RoutesPath } from '../../constants/routes';
import { authService } from '../../graphql/auth/authService';
import { ISignupResult } from '../../graphql/auth/IAuthResult';
import { IFormInput } from '../../graphql/auth/IFormInput';
import { SIGNUP } from '../../graphql/auth/mutation';
import theme from '../../themes/theme';
import { schema } from '../LoginPage/validationSchema';
import { FormAuth, PaperAuth } from './Signup.styles';

const SignupPage: FC = () => {
  const [signup, { loading }] = useMutation<ISignupResult>(SIGNUP);
  const [hiddenPassword, setHiddenPassword] = useState(true);

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
    }
  };

  return (
    <Box paddingTop={15}>
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
              sx={{ mt: 2, backgroundColor: theme.palette.secondary.main }}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              loading={loading}
            >
              Sign up
            </LoadingButton>

            <Button
              sx={{ mt: 1, color: theme.palette.secondary.main }}
              fullWidth
              type="submit"
              variant="text"
              component={NavLink}
              to={RoutesPath.LOGIN}
            >
              Already registered?
            </Button>
          </FormAuth>
        </Grid>
      </PaperAuth>
    </Box>
  );
};

export default SignupPage;
