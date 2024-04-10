import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: { // for login button and header
      primary: {
        light: '#757ce8', // A lighter shade of main
        main: '#3f50b5', // The main shade of the color
        dark: '#002884', // A darker shade of main
        contrastText: '#fff', // Text color, intended to contrast with main
      },
      secondary: { // for register button　
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

export default theme;