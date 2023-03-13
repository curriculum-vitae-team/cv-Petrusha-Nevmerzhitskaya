import { Box, Paper, styled } from '@mui/material';

export const StyledBox = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  margin: '5px'
});

export const PaperWrapper = styled(Paper)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,
  margin: 10
}));

export const ButtonStyles = {
  height: '40px',
  width: '150px'
};
