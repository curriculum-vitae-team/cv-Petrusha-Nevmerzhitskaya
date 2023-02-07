import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Name of the component
    MuiTab: {
      styleOverrides: {
        // Name of the slot
        root: {
          '&.Mui-selected': {
            color: '#c63031'
          }
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#c63031',
      dark: '#2e2e2e',
      light: '#706e6e'
    }
  }
});

export default theme;
