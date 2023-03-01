import { FC } from 'react';

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
