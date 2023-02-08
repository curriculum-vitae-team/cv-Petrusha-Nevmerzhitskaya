import { Avatar, styled } from '@mui/material';

export const UserMenuWrap = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center'
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main
}));

export const IconStyles = {
  mr: 2
};
