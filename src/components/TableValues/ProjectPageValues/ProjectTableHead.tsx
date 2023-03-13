import { TableCell, TableRow } from '@mui/material';
import { createSortLabel } from '@components/Table/SortLabel';

export const ProjectsTableHead = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel('name', 'Name')}</TableCell>
      <TableCell>{createSortLabel('internal_name', 'Internal Name')}</TableCell>
      <TableCell>{createSortLabel('domain', 'Domain')}</TableCell>
      <TableCell>{createSortLabel('start_date', 'Start Date')}</TableCell>
      <TableCell>{createSortLabel('end_date', 'End Date')}</TableCell>
      <TableCell>{createSortLabel('team_size', 'Team Size')}</TableCell>
      <TableCell />
    </TableRow>
  );
};
