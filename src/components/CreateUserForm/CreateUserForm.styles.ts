import {
  Box,
  Button,
  DialogTitle,
  OutlinedInput,
  Select,
  styled
} from '@mui/material';

export const StyledBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'repeat(4, 1fr) min-content',
  gap: '32px'
});

export const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between'
});

export const StyledButton = styled(Button)({
  borderRadius: 0,
  gridColumn: '2 / 3'
});

export const StyledOutlinedInput = styled(OutlinedInput)({
  borderRadius: 0
});

export const StyledSelect = styled(Select)({
  borderRadius: 0
});
