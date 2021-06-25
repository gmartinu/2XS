import { createMuiTheme } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
      light: deepPurple[200],
      dark: deepPurple[800],
    },
    // secondary: {
    //   main: blue[400],
    //   light: blue[200],
    //   dark: blue[600],
    // },
    // error: {
    //   main: '#E53935',
    // },
  },
});

export default theme;
