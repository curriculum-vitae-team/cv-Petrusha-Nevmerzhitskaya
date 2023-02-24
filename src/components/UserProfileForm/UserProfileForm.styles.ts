import { Box, Button, styled } from '@mui/material';

export const StyledBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr min-content',
  gap: '30px'
});

export const StyledButton = styled(Button)({
  borderRadius: 0,
  gridColumn: '2 / 3'
});
