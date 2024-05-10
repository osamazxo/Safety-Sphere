import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const theme = createTheme({
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
      border: "#191b1f",
    },
    text: {
      primary: "#fefeff",
    },
  },
  typography: {
    fontFamily: `"Poppins", sans-serif`,
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
