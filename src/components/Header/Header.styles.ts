import { AppBar, IconButton, styled, Toolbar } from '@mui/material';

export const ToolbarHeader = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main
}));
