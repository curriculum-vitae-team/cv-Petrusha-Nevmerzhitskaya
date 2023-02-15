import { Box, IconButton, styled, Typography } from '@mui/material';

export const StyledBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr min-content',
  gridTemplateRows: 'min-content 1fr'
});

export const StyledTypography = styled(Typography)({
  gridColumn: '1 / 4',
  marginBottom: '16px'
});

export const StyledIconButton = styled(IconButton)({
  padding: '0 16px'
});
