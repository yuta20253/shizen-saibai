'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6a994e',
    },
    secondary: {
      main: '#bc6c25',
    },
  },
  typography: {
    fontFamily: ['"Roboto"', 'sans-serif'].join(','),
  },
});

export default theme;
