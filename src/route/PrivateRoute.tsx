import { useReactiveVar } from '@apollo/client';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { RoutesPath } from '@constants/routes';
import { authService } from '@graphql/auth/authService';

interface IPrivateRouteProps {
  children: React.ReactNode | JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
  const isAuth = useReactiveVar(authService.access_token$);

  if (!isAuth) {
    return <Navigate to={RoutesPath.LOGIN} />;
  }

  return <div>{children}</div>;
};
