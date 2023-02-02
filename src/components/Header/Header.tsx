import { AppBar, Container } from '@mui/material';
import { ReactElement } from 'react';

import { ToolbarHeader } from './Header.styles';

interface Props {
  children: ReactElement | ReactElement[];
}

export const Header: React.FC<Props> = ({ children }) => {
  return (
    <AppBar position="static">
      <Container>
        <ToolbarHeader>{children}</ToolbarHeader>
      </Container>
    </AppBar>
  );
};
