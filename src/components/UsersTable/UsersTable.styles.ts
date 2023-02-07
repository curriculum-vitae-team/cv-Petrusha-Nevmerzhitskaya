import { styled, TableBody, TableCell } from '@mui/material';

export const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold'
});

export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  backgroundColor: theme.palette.lightGrey.light
}));
