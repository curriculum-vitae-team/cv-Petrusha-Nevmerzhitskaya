import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  styled
} from '@mui/material';

export const StyledBox = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  margin: '5px'
});

export const StyledOutlinedInput = styled(OutlinedInput)({
  borderRadius: 0
});

export const StyledButton = styled(Button)({
  borderRadius: 0
});

export const StyledForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '15px'
});

export const StyledFormControl = styled(FormControl)({
  marginTop: '-15px'
});

export const StyledInputLabel = styled(InputLabel)({
  position: 'relative',
  top: '15px'
});
