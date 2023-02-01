import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          paddingTop: 65
        }
      }
    },
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
  }
});

export default theme;
