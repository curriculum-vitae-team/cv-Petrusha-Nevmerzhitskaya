import { useReactiveVar } from '@apollo/client';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton } from '@mui/material';
import { useState } from 'react';

import { authService } from '../../graphql/auth/authService';
import theme from '../../themes/theme';
import { AuthHeader } from '../AuthHeader';
import { HeaderBreadcrumbs } from '../Breadcrumbs/Bredcrumbs';
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
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: theme.palette.primary.dark }}
      >
        <ToolbarHeader>
          {isAuth ? (
            <>
              <IconButton
                onClick={openMenu}
                sx={{ color: theme.palette.primary.main }}
              >
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

      {isAuth && <HeaderBreadcrumbs />}
    </>
  );
};
