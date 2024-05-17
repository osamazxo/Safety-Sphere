import { Menu } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box
      sx={{
        height: "60px",
        display: { xs: "flex", sm: "none" },
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "background.paper",
        borderRadius: "8px",
        border: "1px solid",
        borderColor: (t) => t.common.border,
        padding: "16px",
        my: "16px",
      }}
    >
      <Box display="flex" alignItems="center" gap="8px" component={Link} to="/">
        <img
          src="/logo.png"
          alt="logo"
          style={{
            height: "30px",
          }}
        />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Safety Sphere
        </Typography>
      </Box>
      <IconButton
        onClick={() => {
          document.querySelector(".main-drawer")?.classList.toggle("open");
        }}
      >
        <Menu />
      </IconButton>
    </Box>
  );
};

export default Header;
