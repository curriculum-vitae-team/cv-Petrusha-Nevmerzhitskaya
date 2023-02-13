import { Box } from '@mui/material';

import EmployeeTabs from '../EmployeeTabs';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <EmployeeTabs />
      <Box width={750} margin="auto" marginY={6}>
        {children}
      </Box>
    </>
  );
};

export default ProfileLayout;
