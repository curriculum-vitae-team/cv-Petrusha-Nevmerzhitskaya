import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { BreadcrumbsProvider } from '@components/Breadcrumbs/Breadcrumbs.context';

import { client } from './graphql/auth/client';
import AppRoute from './route/AppRoute';
import theme from './themes/theme';

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BreadcrumbsProvider>
            <AppRoute />
          </BreadcrumbsProvider>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
