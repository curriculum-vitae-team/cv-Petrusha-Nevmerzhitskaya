import { MenuItem, TableCell, TableRow } from '@mui/material';
import ActionsMenu from '@components/Table/ActionsMenu';
import { TableRowProps } from '@components/Table/Table.types';
import { IDepartment } from '@interfaces/IDepartment';

export const DepartmentsTableRow = ({ item }: TableRowProps<IDepartment>) => {
  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell sx={{ textAlign: 'right' }}>
        <ActionsMenu>
          <MenuItem disabled>Update</MenuItem>
          <MenuItem disabled>Delete</MenuItem>
        </ActionsMenu>
      </TableCell>
    </TableRow>
  );
};
