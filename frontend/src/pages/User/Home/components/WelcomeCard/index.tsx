import { Menu } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

const WelcomeCard = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="h5" fontWeight="600" color="text.primary">
          Hello Osama,
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is what we've got for you today
        </Typography>
      </Box>
      <IconButton
        onClick={() => {
          const mainDrawer = document.querySelector(".main-drawer");
          mainDrawer?.classList.toggle("open");
        }}
        sx={{
          display: { xs: "flex", sm: "none" },
        }}
      >
        <Menu />
      </IconButton>
    </Box>
  );
};

export default WelcomeCard;
