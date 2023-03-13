import { TableCell, TableRow } from '@mui/material';
import { createSortLabel } from '@components/Table/SortLabel';

export const LanguagesTableHead = () => {
  return (
    <TableRow>
      <TableCell>{createSortLabel('name', 'Language')}</TableCell>
      <TableCell>{createSortLabel('iso2', 'ISO2')}</TableCell>
      <TableCell />
    </TableRow>
  );
};
