import { Analytics, Home, Logout, Settings } from "@mui/icons-material";
import { Box } from "@mui/material";
import CustomDrawer from "@ui/CustomDrawer";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "@ui/Header";
import { useEffect } from "react";

const drawerItems = [
  {
    title: "Home",
    icon: <Home />,
    url: "/admin",
  },
  {
    title: "Devices",
    icon: <Analytics />,
    url: "/admin/devices",
  },
  {
    title: "Settings",
    icon: <Settings />,
    url: "/admin/settings",
  },
  {
    title: "Sign Out",
    icon: <Logout />,
    url: "/signout",
  },
];

function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("role") === "user") {
      return navigate("/user");
    }
  }, [navigate]);
  return (
    <Box display="flex">
      <CustomDrawer items={drawerItems} />
      <Box
        className="f-column"
        sx={{
          minHeight: "100vh",
          width: "100%",
          maxWidth: "1440px",
          mx: "auto",
          px: "16px",
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
