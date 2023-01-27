import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { client } from './graphql/auth/client';
import AppRoute from './route/AppRoute';
import theme from './themes/theme';

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoute />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
