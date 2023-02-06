import { Card, styled, Toolbar } from '@mui/material';

export const SideMenuToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  backgroundColor: theme.palette.primary.dark
}));

export const SideMenuCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 250,
  borderRadius: 0,
  boxShadow: 'none'
}));

export const IconStyles = styled('div')(({ theme }) => ({
  color: theme.palette.primary.light,
  marginRight: 8,
  display: 'flex',
  alignItems: 'center'
}));
