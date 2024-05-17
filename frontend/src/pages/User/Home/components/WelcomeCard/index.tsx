import { Box, Typography } from "@mui/material";

const WelcomeCard = () => {
  return (
    <Box mt="16px">
      <Typography variant="h5" fontWeight="600" color="text.primary">
        Hello Osama,
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This is what we've got for you today
      </Typography>
    </Box>
  );
};

export default WelcomeCard;
