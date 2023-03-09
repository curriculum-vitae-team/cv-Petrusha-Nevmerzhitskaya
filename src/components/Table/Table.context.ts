import { createContext, Dispatch, SetStateAction } from 'react';
import { SortOrder } from './Table.types';

export const TableSearchContext = createContext<{
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}>({
  search: '',
  setSearch: () => {}
});

export const TableSortContext = createContext<{
  sortBy: string;
  order: SortOrder;
  setSortBy: Dispatch<SetStateAction<string>>;
  setOrder: Dispatch<SetStateAction<SortOrder>>;
}>({
  sortBy: '',
  order: SortOrder.Asc,
  setSortBy: () => {},
  setOrder: () => {}
});
