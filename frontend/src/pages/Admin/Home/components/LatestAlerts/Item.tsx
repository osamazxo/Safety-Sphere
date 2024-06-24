import { AlertType } from "@api/dashboard";
import {
  GasMeterOutlined,
  ThermostatOutlined,
  VibrationOutlined,
  WaterDropOutlined,
} from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";

const alertIcon = {
  temperature: <ThermostatOutlined />,
  humidity: <WaterDropOutlined />,
  vibration: <VibrationOutlined />,
  gas: <GasMeterOutlined />,
  none: "",
};

const Item: FC<{ alert: AlertType; showUserName?: boolean }> = ({
  alert,
  showUserName = false,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: "8px",
        width: "calc( 100% - 16px)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: (theme) => "1px solid " + theme.common.border,
          textTransform: "capitalize",
          pb: "4px",
        }}
      >
        <Typography>{alert.sensor + " sensor"}</Typography>
        {alertIcon[alert.sensor || "none"]}
      </Box>
      <Typography variant="body2" color="text.secondary">
        {alert.reason}
      </Typography>

      <Typography
        variant="caption"
        display="flex"
        gap="8px"
        color="text.secondary"
        alignItems="center"
      >
        <span>
          {alert.startTime
            ? new Date(alert.startTime).toLocaleString("en-us", {
                day: "2-digit",
                month: "short",
                minute: "2-digit",
                hour: "2-digit",
              })
            : " "}
        </span>
        <span>-</span>
        <span>
          {alert.endTime
            ? new Date(alert.endTime).toLocaleString("en-us", {
                day: "2-digit",
                month: "short",
                minute: "2-digit",
                hour: "2-digit",
              })
            : " "}
        </span>
      </Typography>
      {showUserName && (
        <Typography textAlign="right" variant="body1">
          {alert.device?.user?.userName}
        </Typography>
      )}
    </Paper>
  );
};

export default Item;
