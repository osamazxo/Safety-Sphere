import { Box, Typography } from "@mui/material";

const LatestAlerts = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        height: "100%",
        p: "16px",
        borderRadius: "16px",
        minHeight: "320px",
        flex: "1",
      }}
    >
      <Typography variant="h6">Latest Alerts</Typography>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>There is no new alert.</Typography>
      </Box>
    </Box>
  );
};

export default LatestAlerts;
