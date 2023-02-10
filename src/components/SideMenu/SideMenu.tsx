import CloseIcon from '@mui/icons-material/Close';
import { Divider, Drawer, MenuItem, MenuList } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IconStyles,
  SideMenuCard,
  SideMenuToolbar,
  StyledIconButton
} from './SideMenu.styles';
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
          <StyledIconButton onClick={onClose}>
            <CloseIcon />
          </StyledIconButton>
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
