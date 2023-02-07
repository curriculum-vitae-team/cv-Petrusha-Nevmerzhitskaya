import { Box, CircularProgress } from '@mui/material';

const Loader: React.FC = () => (
  <Box margin={5} sx={{ display: 'flex', justifyContent: 'center' }}>
    <CircularProgress />
  </Box>
);

export default Loader;
