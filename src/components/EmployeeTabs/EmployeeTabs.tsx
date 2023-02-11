import { Box, Tab, Tabs } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

interface ITabs {
  label: string;
  path: string;
}

const changePath = (path: string, navValue: string) => {
  const splitted = path.split('/');
  splitted[splitted.length - 1] = navValue;
  return splitted.join('/');
};

const EmployeeTabs: React.FC = () => {
  const location = useLocation();

  const tabs: ITabs[] = [
    {
      label: 'PROFILE',
      path: changePath(location.pathname, 'profile')
    },
    {
      label: 'SKILLS',
      path: changePath(location.pathname, 'skills')
    },
    {
      label: 'LANGUAGES',
      path: changePath(location.pathname, 'languages')
    },
    {
      label: 'CVS',
      path: changePath(location.pathname, 'cvs')
    }
  ];

  return (
    <Box marginY={2} marginX={3}>
      <Tabs
        value={location.pathname}
        TabIndicatorProps={{ style: { background: '#c63031' } }}
      >
        {tabs.map(({ label, path }) => (
          <Tab
            key={label}
            label={label}
            component={NavLink}
            value={path}
            to={path}
            sx={{ fontWeight: 'bold', paddingX: 6 }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default EmployeeTabs;
