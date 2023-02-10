import { useQuery, useReactiveVar } from '@apollo/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';

import { authService } from '../../graphql/auth/authService';
import { IUserResult } from '../../graphql/user/IUserResult';
import { USER } from '../../graphql/user/query';
import theme from '../../themes/theme';
import Loader from '../Loader';
import { IconStyles, StyledAvatar, UserMenuWrap } from './UserMenu.styles';

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userData = useReactiveVar(authService.user$);

  const { loading, error, data } = useQuery<IUserResult>(USER, {
    variables: { id: userData?.id }
  });
  const user = data?.user;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.clearStorage();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <UserMenuWrap>
        <Typography>{user?.profile.full_name || user?.email}</Typography>
        <IconButton onClick={handleClick} size="large">
          <StyledAvatar src={user?.profile.avatar} alt="user avatar">
            {user?.email[0].toUpperCase()}
          </StyledAvatar>
        </IconButton>
      </UserMenuWrap>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        PaperProps={{
          elevation: 24,
          sx: { minWidth: 200, mt: 1, color: theme.palette.primary.light }
        }}
      >
        <MenuItem>
          <AccountCircleIcon sx={IconStyles} />
          Profile
        </MenuItem>

        <MenuItem>
          <SettingsIcon sx={IconStyles} />
          Setting
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <Logout sx={IconStyles} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
