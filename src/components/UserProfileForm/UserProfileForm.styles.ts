import { Box, Button, OutlinedInput, Select, styled } from '@mui/material';

export const StyledBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr min-content',
  gap: '30px'
});

export const StyledOutlinedInput = styled(OutlinedInput)({
  borderRadius: 0
});

export const StyledSelect = styled(Select)({
  borderRadius: 0
});

export const StyledButton = styled(Button)({
  borderRadius: 0,
  gridColumn: '2 / 3'
});
