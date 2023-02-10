import { LoadingButton } from '@mui/lab';
import {
  Grid,
  InputAdornment,
  Paper,
  styled,
  TextField,
  Typography
} from '@mui/material';

export const PaperAuth = styled(Paper)({
  height: 415,
  width: 550,
  padding: '8px',
  margin: '0 auto'
});

export const FormAuth = styled('form')({
  width: '100%'
});

export const StyledGrid = styled(Grid)({
  padding: '32px',
  alignItems: 'center',
  justifyContent: 'center'
});

export const StyledTextField = styled(TextField)({
  marginTop: '16px',
  marginBottom: '4px'
});

export const StyledInputAdornment = styled(InputAdornment)({
  cursor: 'pointer'
});

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: '16px',
  backgroundColor: theme.palette.secondary.main
}));

export const StyledTypography = styled(Typography)({
  marginBottom: '8px'
});
