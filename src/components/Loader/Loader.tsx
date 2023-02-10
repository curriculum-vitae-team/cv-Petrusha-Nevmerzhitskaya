import { CircularProgress } from '@mui/material';

import { StyledBox } from './Loader.styles';

const Loader: React.FC = () => (
  <StyledBox margin={5}>
    <CircularProgress />
  </StyledBox>
);

export default Loader;
