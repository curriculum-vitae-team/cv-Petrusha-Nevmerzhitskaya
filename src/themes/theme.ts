import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          //   fontSize: '1rem'
        }
      }
    }
  }
});

export default theme;
