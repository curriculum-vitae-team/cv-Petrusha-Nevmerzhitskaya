import { useReactiveVar } from '@apollo/client';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { RoutesPath } from '@constants/routes';
import { authService } from '@graphql/auth/authService';

interface IPublicRouteProps {
  children: React.ReactNode | JSX.Element;
}

export const PublicRoute: FC<IPublicRouteProps> = ({ children }) => {
  const isAuth = useReactiveVar(authService.access_token$);

  if (isAuth) {
    return <Navigate to={RoutesPath.EMPLOYEES} />;
  }

  return <div>{children}</div>;
};
