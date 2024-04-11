import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: { // for login button and header
      primary: {
        main: '#27282c', // The main shade of the color
        contrastText: '#fbfbfb', // Text color, intended to contrast with main
      },
      secondary: { // for register button　
        main: '#f5a601',
        contrastText: '#0d0d0d',
      },
      background: {
        default: '#fbfbfb',
      },
    },
  });

export default theme;
