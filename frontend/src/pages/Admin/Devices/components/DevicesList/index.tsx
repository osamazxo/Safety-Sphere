import { FC } from "react";
import { SortBy } from "../..";
import DeviceItem, { DeviceProp } from "./DeviceItem";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const DevicesList: FC<{ sortBy: SortBy }> = ({ sortBy }) => {
  const devices: DeviceProp[] = [
    {
      id: "472788632dbsng433d9",
      gas: 1,
      humidity: 75,
      lastSeen: new Date().toISOString(),
      location: "Egypt",
      temperature: 40,
      vibrition: 0,
    },
    {
      id: "473788632dbsng433d9",
      gas: 1,
      humidity: 75,
      lastSeen: new Date().toISOString(),
      location: "Egypt",
      temperature: 40,
      vibrition: 0,
    },
    {
      id: "472758632dbsng433d9",
      gas: 1,
      humidity: 75,
      lastSeen: new Date().toISOString(),
      location: "Egypt",
      temperature: 40,
      vibrition: 0,
    },
  ];
  console.log(sortBy);
  return (
    <Grid2 container spacing="16px" my="16px">
      {devices.map((device) => (
        <Grid2 key={device.id} xs={12} md={6} lg={4}>
          <DeviceItem item={device} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default DevicesList;
