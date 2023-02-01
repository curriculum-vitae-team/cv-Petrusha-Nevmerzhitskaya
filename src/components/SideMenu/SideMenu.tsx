import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BadgeIcon from '@mui/icons-material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TranslateIcon from '@mui/icons-material/Translate';
import { Divider, MenuItem, MenuList } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesPath } from '../../constants/routes';
import { SideMenuCard, SideMenuToolbar } from './SideMenu.styles';

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
          <MenuItem
            onClick={() => {
              navigate(RoutesPath.EMPLOYEES);
              onClose();
            }}
          >
            <GroupIcon sx={{ color: '#706e6e', mr: 2 }} />
            Employees
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate(RoutesPath.PROJECTS);
              onClose();
            }}
          >
            <AutoAwesomeMotionIcon sx={{ color: '#706e6e', mr: 2 }} />
            Projects
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate(RoutesPath.CVS);
              onClose();
            }}
          >
            <ContactPageIcon sx={{ color: '#706e6e', mr: 2 }} />
            Cvs
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              navigate(RoutesPath.DEPARTMENTS);
              onClose();
            }}
          >
            <GroupsIcon sx={{ color: '#706e6e', mr: 2 }} />
            Departments
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate(RoutesPath.POSITIONS);
              onClose();
            }}
          >
            <BadgeIcon sx={{ color: '#706e6e', mr: 2 }} />
            Positions
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate(RoutesPath.SKILLS);
              onClose();
            }}
          >
            <PsychologyIcon sx={{ color: '#706e6e', mr: 2 }} />
            Skills
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate(RoutesPath.LANGUAGES);
              onClose();
            }}
          >
            <TranslateIcon sx={{ color: '#706e6e', mr: 2 }} />
            Languages
          </MenuItem>
        </MenuList>
      </SideMenuCard>
    </Drawer>
  );
};
