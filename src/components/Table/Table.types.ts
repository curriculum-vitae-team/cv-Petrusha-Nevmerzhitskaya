import { FC, createContext, Dispatch, SetStateAction } from 'react';

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Item = {
  id: string;
};

export type TableRowProps<T> = {
  item: T;
};

export type TableProps<T> = {
  items: T[];
  TableButtonsComponent: FC;
  TableHeadComponent: FC;
  TableRowComponent: FC<TableRowProps<T>>;
  searchBy: (keyof T)[];
  defaultSortBy: keyof T;
};

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
