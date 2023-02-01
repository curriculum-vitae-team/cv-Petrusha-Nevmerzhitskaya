import { useReactiveVar } from '@apollo/client';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useState } from 'react';

import { authService } from '../../graphql/auth/authService';
import { AuthHeader } from '../AuthHeader';
import { SideMenu } from '../SideMenu';
import { UserMenu } from '../UserMenu';
import { ToolbarHeader } from './Header.styles';

export const Header = () => {
  const isAuth = useReactiveVar(authService.access_token$);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 90);
  };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#2e2e2e ' }}>
      <ToolbarHeader>
        {isAuth ? (
          <>
            <IconButton onClick={openMenu} sx={{ color: '#c63031' }}>
              <MenuIcon />
            </IconButton>
            <SideMenu open={isOpen} onClose={closeMenu} />
            <UserMenu />
          </>
        ) : (
          <AuthHeader />
        )}
      </ToolbarHeader>
    </AppBar>
  );
};
