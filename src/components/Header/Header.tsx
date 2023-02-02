import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

import { AuthHeader } from '../AuthHeader';
import { ToolbarHeader } from './Header.styles';

export const Header = () => {
  return (
    <AppBar position="fixed">
      <Container>
        <ToolbarHeader>
          <AuthHeader />
        </ToolbarHeader>
      </Container>
    </AppBar>
  );
};
