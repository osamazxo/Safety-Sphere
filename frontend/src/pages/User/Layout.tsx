import { Analytics, Home, Logout, Settings } from "@mui/icons-material";
import { Box } from "@mui/material";
import CustomDrawer from "@ui/CustomDrawer";
import { Outlet } from "react-router-dom";

const drawerItems = [
  {
    title: "Home",
    icon: <Home />,
    url: "/user",
  },
  {
    title: "Analytics",
    icon: <Analytics />,
    url: "/user/analytics",
  },
  {
    title: "Settings",
    icon: <Settings />,
    url: "/user/settings",
  },
  {
    title: "Sign Out",
    icon: <Logout />,
    url: "/signout",
  },
];

function Layout() {
  return (
    <Box display="flex" gap="16px">
      <CustomDrawer items={drawerItems} />
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
    </Box>
  );
}

export default Layout;
