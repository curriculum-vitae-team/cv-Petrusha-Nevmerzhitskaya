import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    lightGrey: Palette['primary'];
  }

  interface PaletteOptions {
    lightGrey: PaletteOptions['primary'];
  }
}

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
    // grey colors
    primary: {
      main: '#2e2e2e',
      dark: '#2e2e2e',
      light: '706e6e'
    },
    // red colors
    secondary: {
      main: red[900],
      dark: red[900],
      light: '#c63031'
    },
    // light grey (background)
    lightGrey: {
      main: '#bdbdbd',
      light: '#f5f5f7',
      dark: '#6d6d6d'
    }
  }
});

export default theme;
