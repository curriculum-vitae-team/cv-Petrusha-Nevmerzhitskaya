import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { RoutesPath } from '@constants/routes';
import { authService } from '@graphql/auth/authService';
import { ISignupResult } from '@graphql/auth/IAuthResult';
import { IFormInput } from '@graphql/auth/IFormInput';
import { SIGNUP } from '@graphql/auth/mutation';
import theme from '@themes/theme';
import { schema } from '../LoginPage/validationSchema';
import {
  FormAuth,
  PaperAuth,
  StyledGrid,
  StyledInputAdornment,
  StyledLoadingButton,
  StyledTextField,
  StyledTypography
} from './Signup.styles';

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
        <StyledGrid container direction="column">
          <StyledTypography variant="h4">Register Now</StyledTypography>
          <Typography>Welcome! Sign up to continue.</Typography>
          <FormAuth onSubmit={handleSubmit(onSubmit)}>
            <StyledTextField
              fullWidth
              label="Email"
              placeholder="Enter email"
              variant="outlined"
              color="secondary"
              type="email"
              {...register('email')}
              helperText={errors.email?.message}
              error={!!errors.email}
            />

            <StyledTextField
              fullWidth
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
                  <StyledInputAdornment position="end" onClick={showPassword}>
                    {hiddenPassword ? <Visibility /> : <VisibilityOff />}
                  </StyledInputAdornment>
                )
              }}
            />

            <StyledLoadingButton
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              loading={loading}
            >
              Sign up
            </StyledLoadingButton>

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
        </StyledGrid>
      </PaperAuth>
    </Box>
  );
};

export default SignupPage;
