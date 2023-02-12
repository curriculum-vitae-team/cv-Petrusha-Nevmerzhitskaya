import { IProject } from '../../interfaces/IProject';
import { SortingType } from './types';

export const sortUsers = (projects: IProject[], sorting: SortingType) => {
  const { name, asc } = sorting;

  if (name === 'name' || name === 'internal_name') {
    return projects.sort((prev, cur) => {
      if (!prev.name) {
        return 1;
      }
      if (!cur.name) {
        return -1;
      }
      if (prev.name! > cur.name!) {
        return asc ? 1 : -1;
      }
      if (prev.name! < cur.name!) {
        return asc ? -1 : 1;
      }
      return 0;
    });
  }

  return projects.sort((prev, cur) => {
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

export const filterUsers = (projects: IProject[], search: string) => {
  const searchValue = search.toLowerCase();

  return projects.filter(
    ({ name, internal_name }) =>
      name.toLowerCase().includes(searchValue) ||
      internal_name?.toLowerCase().includes(searchValue)
  );
};
