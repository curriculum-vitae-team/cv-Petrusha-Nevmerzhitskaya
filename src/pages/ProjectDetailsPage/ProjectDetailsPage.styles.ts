import { Paper, styled } from '@mui/material';

export const PaperWrapper = styled(Paper)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,
  margin: 10
}));

export const InfoWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10
}));

export const ButtonStyles = {
  height: '40px',
  width: '100px'
};
