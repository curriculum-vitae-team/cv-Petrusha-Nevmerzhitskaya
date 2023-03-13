import { Box, Paper, styled } from '@mui/material';

export const StyledBox = styled(Box)({
  marginBottom: '10px'
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

export const ItemBox = styled(Paper)({
  padding: '10px',
  minHeight: '50px',
  minWidth: '290px',
  marginBottom: '10px'
});
