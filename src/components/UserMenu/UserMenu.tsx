import { useReactiveVar } from '@apollo/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesPath } from '../../constants/routes';
import { authService } from '../../graphql/auth/authService';
import { IconStyles, UserMenuStyles, UserMenuWrap } from './UserMenu.styles';

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useReactiveVar(authService.user$);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.clearStorage();
    navigate(RoutesPath.LOGIN);
  };

  return (
    <>
      <UserMenuWrap>
        <Typography>{user?.email}</Typography>
        <IconButton onClick={handleClick} size="large">
          <Avatar sx={{ backgroundColor: '#c63031' }}>
            {user?.email[0].toUpperCase()}
          </Avatar>
        </IconButton>
      </UserMenuWrap>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        PaperProps={{
          elevation: 24,
          sx: UserMenuStyles
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
