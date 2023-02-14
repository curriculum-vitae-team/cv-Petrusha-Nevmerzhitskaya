import { useReactiveVar } from '@apollo/client';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

import { authService } from '@graphql/auth/authService';
import { AuthHeader } from '../AuthHeader';
import { HeaderBreadcrumbs } from '../Breadcrumbs/Bredcrumbs';
import { SideMenu } from '../SideMenu';
import { UserMenu } from '../UserMenu';
import { StyledAppBar, StyledIconButton, ToolbarHeader } from './Header.styles';

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
      <StyledAppBar position="fixed">
        <ToolbarHeader>
          {isAuth ? (
            <>
              <StyledIconButton onClick={openMenu}>
                <MenuIcon />
              </StyledIconButton>
              <SideMenu open={isOpen} onClose={closeMenu} />
              <UserMenu />
            </>
          ) : (
            <AuthHeader />
          )}
        </ToolbarHeader>
      </StyledAppBar>

      {isAuth && <HeaderBreadcrumbs />}
    </>
  );
};
