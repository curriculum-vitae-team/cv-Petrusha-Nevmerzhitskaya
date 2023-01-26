import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import React from 'react';

import { AuthHeader } from '../AuthHeader/AuthHeader';
import { ToolbarHeader } from './Header.styles';

export const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2e2e2e ' }}>
      <Container>
        <ToolbarHeader>
          <AuthHeader />
        </ToolbarHeader>
      </Container>
    </AppBar>
  );
};
