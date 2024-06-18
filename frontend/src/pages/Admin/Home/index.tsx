import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ActiveDevicesChart from "./components/ActiveDevicesChart";
import LatestAlerts from "./components/LatestAlerts";
import LocationChart from "./components/LocationChart";
import { Box, SxProps } from "@mui/material";
import IndicationCard from "./components/IndicationCard";
import {
  ArticleOutlined,
  DeveloperBoard,
  SensorsOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
const iconStyle: SxProps = {
  color: "text.secondary",
};
const Home = () => {
  return (
    <Grid2 container spacing="16px" my="8px">
      <Grid2 xs={12} lg={8}>
        <ActiveDevicesChart />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} display="flex">
        <LatestAlerts />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} display="flex">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap="16px"
          flex={1}
        >
          <IndicationCard
            icon={<DeveloperBoard sx={iconStyle} />}
            title="Total Devices"
            value={1500}
            helperText="Total reading since the start"
          />
          <IndicationCard
            icon={<SensorsOutlined sx={iconStyle} />}
            title="Active Devices"
            value={300}
            helperText="Total active devices in the last 7 days"
          />
        </Box>
      </Grid2>
      <Grid2 xs={12} md={6} lg={4} display="flex">
        <LocationChart />
      </Grid2>
      <Grid2 xs={12} md={6} lg={4}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="space-between"
          gap="16px"
          height="100%"
        >
          <IndicationCard
            icon={<WarningAmberOutlined sx={iconStyle} />}
            title="Total Alerts"
            value={300}
            helperText="Total alerts in the last 7 days"
          />
          <IndicationCard
            icon={<ArticleOutlined sx={iconStyle} />}
            title="Total Readings"
            value={12500}
            helperText="Total readings in the last 7 days"
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Home;
