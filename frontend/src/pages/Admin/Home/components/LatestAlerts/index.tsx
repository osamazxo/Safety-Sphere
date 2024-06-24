import { AlertType } from "@api/dashboard";
import { Box, SxProps, Typography } from "@mui/material";
import { FC } from "react";
import Item from "./Item";

const LatestAlerts: FC<{
  alerts: AlertType[];
  showUserName?: boolean;
  sx?: SxProps;
}> = ({ alerts, showUserName = false, sx }) => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        height: "100%",
        p: "16px 8px",
        borderRadius: "16px",
        minHeight: "320px",
        flex: "1",
      }}
    >
      <Typography variant="h6" mb="8px">
        Latest Alerts
      </Typography>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: alerts.length === 0 ? "center" : "flex-start",
          flexDirection: "column",
          gap: "8px",
          overflowY: "auto",
          maxHeight: "250px",
          ...sx,
        }}
      >
        {alerts.length === 0 ? (
          <Typography>There is no new alert.</Typography>
        ) : (
          alerts.map((ele) => <Item alert={ele} showUserName={showUserName} />)
        )}
      </Box>
    </Box>
  );
};

export default LatestAlerts;
