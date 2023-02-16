import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TranslateIcon from '@mui/icons-material/Translate';
import { FC } from 'react';

import { RoutesPath } from '@constants/routes';

interface INavigationMenuItem {
  icon: FC;
  label: string;
  path: RoutesPath;
}
export const SideMenuItems: INavigationMenuItem[] = [
  {
    icon: GroupIcon,
    label: 'Employees',
    path: RoutesPath.EMPLOYEES
  },
  {
    icon: AutoAwesomeMotionIcon,
    label: 'Projects',
    path: RoutesPath.PROJECTS
  },
  {
    icon: ContactPageIcon,
    label: 'Cvs',
    path: RoutesPath.CVS
  },
  {
    icon: GroupsIcon,
    label: 'Departments',
    path: RoutesPath.DEPARTMENTS
  },
  {
    icon: BadgeIcon,
    label: 'Positions',
    path: RoutesPath.POSITIONS
  },
  {
    icon: PsychologyIcon,
    label: 'Skills',
    path: RoutesPath.SKILLS
  },
  {
    icon: TranslateIcon,
    label: 'Languages',
    path: RoutesPath.LANGUAGES
  }
];
