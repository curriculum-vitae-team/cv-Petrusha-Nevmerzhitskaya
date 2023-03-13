import { TableCell, TableRow } from '@mui/material';
import { createSortLabel } from '@components/Table/SortLabel';

export const SkillsTableHead = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel('name', 'Skill Name')}</TableCell>
      <TableCell />
    </TableRow>
  );
};
