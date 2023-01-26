import { Box, Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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
          value="/login"
          component={NavLink}
          label="login"
          to="/login"
        />
        <Tab
          sx={{
            color: 'white',
            minWidth: 150,
            fontWeight: 600
          }}
          value="/signup"
          component={NavLink}
          label="signup"
          to="/signup"
        />
      </Tabs>
    </Box>
  );
};
