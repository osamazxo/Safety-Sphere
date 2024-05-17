import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="90px"
      px="16px"
      mb="16px"
      sx={{
        borderBottom: "1px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      {/* <Box display="flex" gap="16px" alignItems="center">
        <img src="/logo.png" alt="website logo" style={{ width: "36px" }} />
        <Typography variant="h5" fontWeight="600">
          Safety Sphere
        </Typography>
      </Box> */}
      <Link to="/" style={{ display: "flex" }}>
        <img
          src="/logo-long.png"
          alt="logo"
          style={{
            width: "220px",
          }}
        />
      </Link>

      <IconButton
        sx={{
          display: { xs: "flex", sm: "none" },
        }}
        onClick={() => {
          document.querySelector(".main-drawer")?.classList.toggle("open");
        }}
      >
        <Close />
      </IconButton>
    </Box>
  );
};

export default Header;
