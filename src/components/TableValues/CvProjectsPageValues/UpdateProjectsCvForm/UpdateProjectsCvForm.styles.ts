import { Box, DialogTitle, styled } from '@mui/material';

export const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  gap: '20px'
});

export const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});
