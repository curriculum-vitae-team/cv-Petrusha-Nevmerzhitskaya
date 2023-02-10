import { styled } from '@mui/material';

export const Container = styled('div')(() => ({
  maxWidth: 600,
  rowGap: 10,
  bottom: '20px',
  left: '20px',
  display: 'flex',
  position: 'fixed',
  flexDirection: 'column'
}));
