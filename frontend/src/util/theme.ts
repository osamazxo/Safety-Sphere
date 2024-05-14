import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    common: {
      border: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    common?: { border?: string };
  }
}

const theme = createTheme({
  common: {
    border: "#191b1f",
  },
  palette: {
    mode: "dark",
    background: {
      default: "#0b0d11",
      paper: "#121417",
    },
    primary: {
      main: "#41b06e",
      light: "#29b562",
      dark: "#29b562",
    },
    text: {
      primary: "#fefeff",
    },
  },
  typography: {
    fontFamily: `"Inter", sans-serif`,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& input": {
            padding: "8px 14px ",
            fontSize: "14px",
          },
        },
      },
    },
  },
});

export default theme;
