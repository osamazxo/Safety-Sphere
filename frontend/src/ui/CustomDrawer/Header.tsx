import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb="16px"
      pb="24px"
      pt="8px"
      sx={{
        borderBottom: "1px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Box display="flex" gap="16px" alignItems="center">
        <img src="/logo.png" alt="website logo" style={{ width: "36px" }} />
        <Typography variant="h5" fontWeight="600">
          Safety Sphere
        </Typography>
      </Box>
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
