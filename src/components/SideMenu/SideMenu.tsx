import CloseIcon from '@mui/icons-material/Close';
import { Divider, MenuItem, MenuList } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconStyles, SideMenuCard, SideMenuToolbar } from './SideMenu.styles';
import { SideMenuItems } from './SideMenuItems';

interface ISideMenuProps {
  open: boolean;
  onClose: () => void;
}

export const SideMenu: FC<ISideMenuProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={open} onClick={onClose}>
      <SideMenuCard>
        <SideMenuToolbar>
          <IconButton onClick={onClose} sx={{ color: '#c63031' }}>
            <CloseIcon />
          </IconButton>
        </SideMenuToolbar>
        <MenuList>
          {SideMenuItems.map(({ icon: Icon, label, path }, index) => {
            return (
              <>
                <MenuItem
                  key={path}
                  onClick={() => {
                    navigate(path);
                    onClose();
                  }}
                >
                  <IconStyles>
                    <Icon />
                  </IconStyles>
                  {label}
                </MenuItem>
                {index === 2 && <Divider key={label} />}
              </>
            );
          })}
        </MenuList>
      </SideMenuCard>
    </Drawer>
  );
};
