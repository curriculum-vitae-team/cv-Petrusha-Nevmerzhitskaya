import { useQuery, useReactiveVar } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import { authService } from '@graphql/auth/authService';
import { IUserResult } from '@graphql/user/IUserResult';
import { USER } from '@graphql/user/query';

const useUserData = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const { loading, error, data } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  });
  const user = data?.user;

  const loggedUser = useReactiveVar(authService.user$);

  return { user, loggedUser, loading, error };
};

export default useUserData;
