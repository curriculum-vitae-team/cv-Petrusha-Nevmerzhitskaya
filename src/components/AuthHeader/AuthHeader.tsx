import { Tab, Tabs } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { RoutesPath } from '../../constants/routes';
import theme from '../../themes/theme';
import { StyledBox, StyledNavLink } from './AuthHeader.styles';

export const AuthHeader = () => {
  const location = useLocation();

  return (
    <StyledBox>
      <Tabs
        value={location.pathname}
        TabIndicatorProps={{
          style: { background: theme.palette.secondary.main }
        }}
        centered
      >
        <Tab
          value={RoutesPath.LOGIN}
          component={StyledNavLink}
          label="login"
          sx={{ color: 'white' }}
          to={RoutesPath.LOGIN}
        />
        <Tab
          value={RoutesPath.SIGNUP}
          component={StyledNavLink}
          label="signup"
          sx={{ color: 'white' }}
          to={RoutesPath.SIGNUP}
        />
      </Tabs>
    </StyledBox>
  );
};
