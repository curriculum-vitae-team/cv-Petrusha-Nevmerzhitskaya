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

export const IconStyles = {
  color: '#706e6e',
  mr: 2
};
