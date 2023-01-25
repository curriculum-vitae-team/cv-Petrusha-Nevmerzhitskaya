import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoute from './route/AppRoute';
import theme from './themes/theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRoute />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
