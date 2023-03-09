import { TableCell, TableRow } from '@mui/material';
import { TableRowProps } from '@components/Table/Table.types';
import { IProject } from '@interfaces/IProject';

export const CvProjectsTableRow = ({ item }: TableRowProps<IProject>) => {
  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.internal_name}</TableCell>
      <TableCell>{item.domain}</TableCell>
      <TableCell>{item.start_date}</TableCell>
      <TableCell>{item.end_date || 'Till now'}</TableCell>
      <TableCell />
    </TableRow>
  );
};
