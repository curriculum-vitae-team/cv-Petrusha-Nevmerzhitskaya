import { Card, styled, Toolbar } from '@mui/material';

export const SideMenuToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'flex-end',
  backgroundColor: '#2e2e2e'
});

export const SideMenuCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 250,
  borderRadius: 0,
  boxShadow: 'none'
}));

export const IconStyles = styled('div')(() => ({
  color: '#706e6e',
  marginRight: 10,
  display: 'flex',
  alignItems: 'center'
}));
