import { IUser } from '@interfaces/IUser';
import { SortingType } from './types';

export const sortUsers = (users: IUser[], sorting: SortingType) => {
  const { name, asc } = sorting;

  if (name === 'first_name' || name === 'last_name') {
    return users.sort((prev, cur) => {
      if (!prev.profile[name]) {
        return 1;
      }
      if (!cur.profile[name]) {
        return -1;
      }
      if (prev.profile[name]! > cur.profile[name]!) {
        return asc ? 1 : -1;
      }
      if (prev.profile[name]! < cur.profile[name]!) {
        return asc ? -1 : 1;
      }
      return 0;
    });
  }

  return users.sort((prev, cur) => {
    if (!prev[name]) {
      return 1;
    }
    if (!cur[name]) {
      return -1;
    }
    if (prev[name]! > cur[name]!) {
      return asc ? 1 : -1;
    }
    if (prev[name]! < cur[name]!) {
      return asc ? -1 : 1;
    }
    return 0;
  });
};

export const filterUsers = (users: IUser[], search: string) => {
  const searchValue = search.toLowerCase();

  return users.filter(
    ({ profile: { first_name, last_name }, email }) =>
      email.toLowerCase().includes(searchValue) ||
      first_name?.toLowerCase().includes(searchValue) ||
      last_name?.toLowerCase().includes(searchValue)
  );
};
