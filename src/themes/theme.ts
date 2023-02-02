import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

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
      main: '#2e2e2e',
      light: '#2e2e2e',
      dark: '#2e2e2e'
    },
    secondary: {
      main: red[900],
      light: red[900],
      dark: red[900]
    }
  }
});

export default theme;
