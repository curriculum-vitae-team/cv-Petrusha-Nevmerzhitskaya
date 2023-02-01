import { Box, Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import { NavLink, useLocation } from 'react-router-dom';

import { RoutesPath } from '../../constants/routes';

export const AuthHeader = () => {
  const location = useLocation();

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Tabs
        value={location.pathname}
        TabIndicatorProps={{ style: { background: '#c63031' } }}
        centered
      >
        <Tab
          sx={{ color: 'white', minWidth: 150, fontWeight: 600 }}
          value={RoutesPath.LOGIN}
          component={NavLink}
          label="login"
          to={RoutesPath.LOGIN}
        />
        <Tab
          sx={{
            color: 'white',
            minWidth: 150,
            fontWeight: 600
          }}
          value={RoutesPath.SIGNUP}
          component={NavLink}
          label="signup"
          to={RoutesPath.SIGNUP}
        />
      </Tabs>
    </Box>
  );
};
