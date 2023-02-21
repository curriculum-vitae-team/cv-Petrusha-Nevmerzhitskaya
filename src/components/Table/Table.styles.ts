import { styled, TableCell, Table } from '@mui/material';

export const ToolBar = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.lightGrey.light
}));

export const MuiTable = styled(Table)({
  width: '96%',
  marginLeft: '25px'
});

export const ButtonsWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});
