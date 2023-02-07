import CloseIcon from '@mui/icons-material/Close';
import { Divider, Drawer, IconButton, MenuItem, MenuList } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '../../themes/theme';
import { IconStyles, SideMenuCard, SideMenuToolbar } from './SideMenu.styles';
import { SideMenuItems } from './SideMenuItems';

interface ISideMenuProps {
  open: boolean;
  onClose: () => void;
}

export const SideMenu: FC<ISideMenuProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const ItemOnClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClick={onClose}>
      <SideMenuCard>
        <SideMenuToolbar>
          <IconButton
            onClick={onClose}
            sx={{ color: theme.palette.secondary.main }}
          >
            <CloseIcon />
          </IconButton>
        </SideMenuToolbar>
        <MenuList>
          {SideMenuItems.map(({ icon: Icon, label, path }, index) => {
            return [
              <MenuItem
                key={path}
                onClick={() => {
                  ItemOnClick(path);
                }}
              >
                <IconStyles>
                  <Icon />
                </IconStyles>
                {label}
              </MenuItem>,
              index === 2 && <Divider key={label} />
            ];
          })}
        </MenuList>
      </SideMenuCard>
    </Drawer>
  );
};
