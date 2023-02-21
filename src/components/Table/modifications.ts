import { Item, SortOrder } from './Table.types';

export const sortItems = <T>(
  items: T[],
  sortBy: keyof T,
  order: SortOrder
): T[] => {
  return [...items].sort((a, b) => {
    const comparison = a[sortBy] > b[sortBy] ? 1 : -1;
    return order === 'asc' ? comparison : -comparison;
  });
};

export const searchItems = <T extends Item>(
  keys: (keyof T)[],
  value: string
) => (item: T) => {
  return keys.some((key) => {
    const field = item[key];
    if (field) {
      return field
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    }
    return false;
  });
};
