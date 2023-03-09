import { Button, DialogTitle, styled } from '@mui/material';

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  marginTop: '32px'
});

export const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between'
});

export const StyledButton = styled(Button)({
  borderRadius: 0,
  gridColumn: '1 / 3',
  width: '50%',
  marginLeft: '50%'
});
