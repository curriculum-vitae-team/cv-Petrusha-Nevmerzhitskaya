import { makeVar, ReactiveVar } from '@apollo/client';

import { IUser } from '../../interfaces/IUser';

interface IAuthService {
  user$: ReactiveVar<IUser | null>;
  access_token$: ReactiveVar<string>;
  addUserToStorage: (user: IUser, access_token: string) => void;
  clearStorage: () => void;
}

const userVar = makeVar<IUser | null>(
  JSON.parse(localStorage.getItem('user') ?? 'null')
);
const accessTokenVar = makeVar<string>(
  localStorage.getItem('access_token') || ''
);

const addUserToStorage = (user: IUser, access_token: string) => {
  userVar(user);
  accessTokenVar(access_token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('access_token', access_token);
};

const clearStorage = () => {
  userVar(null);
  accessTokenVar('');
  localStorage.removeItem('user');
  localStorage.removeItem('access_token');
};

export const authService: IAuthService = {
  user$: userVar,
  access_token$: accessTokenVar,
  addUserToStorage,
  clearStorage
};
