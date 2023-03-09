import { TableCell, TableRow } from '@mui/material';
import { createSortLabel } from '@components/Table/SortLabel';

export const CVsTableHead = () => {
  return (
    <TableRow>
      <TableCell>Template</TableCell>
      <TableCell>{createSortLabel('name', 'Name')}</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>{createSortLabel('user.email', 'Employee')}</TableCell>
      <TableCell>Projects</TableCell>
      <TableCell />
    </TableRow>
  );
};
