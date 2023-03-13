import { TableCell, TableRow } from '@mui/material';
import { createSortLabel } from '@components/Table/SortLabel';

export const DepartmentTableHead = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel('name', 'Department Name')}</TableCell>
      <TableCell />
    </TableRow>
  );
};
