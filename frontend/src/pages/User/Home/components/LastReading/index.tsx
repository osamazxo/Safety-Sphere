import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Item from "./Item";
import {
  DeviceThermostatOutlined,
  WaterDropOutlined,
} from "@mui/icons-material";

const LastReading = () => {
  return (
    <Grid2 container my="16px" spacing="16px">
      <Item
        item={{
          title: "Temperature",
          value: 54,
          symbol: "°C",
          icon: <DeviceThermostatOutlined />,
          date: new Date().toISOString(),
        }}
      />
      <Item
        item={{
          title: "Humidity",
          value: 70,
          symbol: "%",
          icon: <WaterDropOutlined />,
          date: new Date().toISOString(),
        }}
      />
      <Item
        item={{
          title: "Gas",
          value: 0,
          icon: <DeviceThermostatOutlined />,
          date: new Date().toISOString(),
        }}
      />
      <Item
        item={{
          title: "Vibration",
          value: 0,
          icon: <DeviceThermostatOutlined />,
          date: new Date().toISOString(),
        }}
      />
    </Grid2>
  );
};

export default LastReading;
