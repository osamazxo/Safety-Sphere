import { FC } from "react";
import { SortBy } from "../..";
import DeviceItem from "./DeviceItem";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useGetDevices } from "@api/devices";

const DevicesList: FC<{ sortBy: SortBy; searchValue: string }> = ({
  sortBy,
  searchValue,
}) => {
  const { data: devices } = useGetDevices();
  console.log(searchValue);
  return (
    <Grid2 container spacing="16px" my="16px">
      {devices
        ?.filter((ele) => ele.user?.userName.includes(searchValue))
        ?.sort((a, b) => ((a?.[sortBy] || 0) > (b?.[sortBy] || 0) ? 1 : -1))
        .map((device) => (
          <Grid2 key={device._id} xs={12} md={6} lg={4}>
            <DeviceItem item={device} />
          </Grid2>
        ))}
    </Grid2>
  );
};

export default DevicesList;
