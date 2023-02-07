import { useReactiveVar } from '@apollo/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

import { authService } from '../../graphql/auth/authService';
import theme from '../../themes/theme';
import { IconStyles, UserMenuWrap } from './UserMenu.styles';

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useReactiveVar(authService.user$);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.clearStorage();
  };

  return (
    <>
      <UserMenuWrap>
        <Typography>{user?.email}</Typography>
        <IconButton onClick={handleClick} size="large">
          <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
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
