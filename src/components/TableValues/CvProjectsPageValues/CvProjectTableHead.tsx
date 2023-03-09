import { TableCell, TableRow } from '@mui/material';
import { createSortLabel } from '@components/Table/SortLabel';

export const CvProjectsTableHead = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel('name', 'Name')}</TableCell>
      <TableCell>{createSortLabel('internal_name', 'Internal Name')}</TableCell>
      <TableCell>{createSortLabel('domain', 'Domain')}</TableCell>
      <TableCell>{createSortLabel('start_date', 'Start Date')}</TableCell>
      <TableCell>{createSortLabel('end_date', 'End Date')}</TableCell>
      <TableCell />
    </TableRow>
  );
};
