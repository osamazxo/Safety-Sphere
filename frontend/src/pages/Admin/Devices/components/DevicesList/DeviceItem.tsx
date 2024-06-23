import { DeviceType } from "@api/devices";
import {
  GasMeterOutlined,
  MoreHorizOutlined,
  PlaceOutlined,
  Thermostat,
  VibrationOutlined,
  WaterDropOutlined,
} from "@mui/icons-material";
import { Box, IconButton, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC, useState } from "react";
import DeviceMenu from "./DeviceMenu";

const Detial: FC<{
  Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">>;
  value: string;
}> = ({ Icon, value }) => {
  return (
    <Box display="flex" alignItems="center" gap="4px" width="calc(50% - 8px)">
      <Icon
        sx={{
          color: "text.secondary",
        }}
      />
      <Typography variant="subtitle1" fontWeight="600">
        {value}
      </Typography>
    </Box>
  );
};

const DeviceItem: FC<{
  item: DeviceType;
}> = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      p="16px"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "16px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pb="8px"
        mb="8px"
        sx={{
          borderBottom: (theme) => "1px solid" + theme.common.border,
        }}
      >
        <Typography variant="body1" fontWeight="600">
          {item?.user?.userName}
        </Typography>
        <IconButton
          sx={{ p: "4px" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreHorizOutlined fontSize="small" />
        </IconButton>
      </Box>
      <Box></Box>
      <Box display="flex" flexWrap="wrap" gap="8px" mb="8px">
        <Detial
          Icon={Thermostat}
          value={item.temperature ? item.temperature + "°C" : "Unknown"}
        />
        <Detial
          Icon={WaterDropOutlined}
          value={item.humidity ? item.humidity + "%" : "Unknown"}
        />
        <Detial
          Icon={GasMeterOutlined}
          value={item.gas === 1 ? "True" : "False"}
        />
        <Detial
          Icon={VibrationOutlined}
          value={item.humidity === 1 ? "True" : "False"}
        />
        <Detial Icon={PlaceOutlined} value={item.location} />
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        textAlign="right"
        component="p"
      >
        {new Date(item.lastSeen).toLocaleString("en-us", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <DeviceMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} device={item} />
    </Box>
  );
};

export default DeviceItem;
