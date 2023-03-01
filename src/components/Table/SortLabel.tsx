import { TableSortLabel } from '@mui/material';
import { useContext } from 'react';
import { TableSortContext } from './Table.context';
import { SortOrder } from './Table.types';

export type SortLabelProps<T> = {
  column: T;
  children: string;
};

const SortLabel = <T extends string>({
  column,
  children,
  ...props
}: SortLabelProps<T>) => {
  const { sortBy, order, setSortBy, setOrder } = useContext(TableSortContext);
  const isActive = sortBy === column;

  function handleClick() {
    if (isActive) {
      setOrder(order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc);
    } else {
      setSortBy(column);
      setOrder(SortOrder.Asc);
    }
  }

  return (
    <TableSortLabel
      {...props}
      active={isActive}
      direction={order}
      onClick={handleClick}
    >
      {children}
    </TableSortLabel>
  );
};

export const createSortLabel = (column: string, label: string) => (
  <SortLabel column={column}>{label}</SortLabel>
);
