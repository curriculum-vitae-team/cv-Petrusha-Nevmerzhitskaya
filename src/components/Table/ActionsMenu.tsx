import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import { useState, MouseEvent } from 'react';

type ActionsMenuProps = {
  children: React.ReactNode;
};

const ActionsMenu = ({ children }: ActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClick={handleClose}
      >
        {children}
      </Menu>
    </>
  );
};

export default ActionsMenu;
