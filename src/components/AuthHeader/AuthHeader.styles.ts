import { Box, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledBox = styled(Box)({
  mt: 2,
  width: '100%'
});

export const StyledNavLink = styled(NavLink)({
  minWidth: 150,
  fontWeight: 600
});
