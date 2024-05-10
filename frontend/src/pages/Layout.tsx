import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box
      className="f-column"
      sx={{
        minHeight: "100vh",
        width: "100%",
        px: "16px",
      }}
    >
      <Outlet />
    </Box>
  );
}

export default Layout;
