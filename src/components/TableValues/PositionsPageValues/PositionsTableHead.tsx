import { TableCell, TableRow } from '@mui/material';
import { createSortLabel } from '@components/Table/SortLabel';

export const PositionsTableHead = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel('name', 'Position Name')}</TableCell>
      <TableCell />
    </TableRow>
  );
};
