import { Box } from "@mui/material";
import PageTitle from "@ui/PageTitle";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ConstrolBar from "./components/ControlBar";
import DevicesList from "./components/DevicesList";
export type SortBy =
  | "_id"
  | "location"
  | "temperature"
  | "humidity"
  | "gas"
  | "vibration";
const Devices = () => {
  const [sortBy, setSortBy] = useState<SortBy>("_id");
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <Helmet>
        <title>Devices | Safety Sphere</title>
      </Helmet>
      <Box>
        <PageTitle>Devices</PageTitle>
        <ConstrolBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <DevicesList sortBy={sortBy} searchValue={searchValue} />
      </Box>
    </>
  );
};

export default Devices;
