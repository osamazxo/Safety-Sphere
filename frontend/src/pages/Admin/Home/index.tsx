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
import { Helmet } from "react-helmet-async";
import { useGetAdminDashboard } from "@api/dashboard";
import { getLastDates } from "@util/dateHelpers";
import Spinner from "@ui/Spinner";

const iconStyle: SxProps = {
  color: "text.secondary",
};

const last7dates = getLastDates(7);

const Home = () => {
  const { data, isLoading, isError } = useGetAdminDashboard();
  const activeDevicesSerries: { [key: string]: number } = {};
  data?.activeDevicesSeries?.forEach(
    (ele) => (activeDevicesSerries[ele.date] = ele.total)
  );
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Safety Sphere</title>
      </Helmet>
      {isLoading ? (
        <Spinner sx={{ height: "100vh" }} />
      ) : isError ? (
        ""
      ) : (
        <Grid2 container spacing="16px" my="8px">
          <Grid2 xs={12} lg={8}>
            <ActiveDevicesChart
              categories={last7dates}
              series={last7dates.map((ele) => activeDevicesSerries[ele] || 0)}
            />
          </Grid2>
          <Grid2 xs={12} md={6} lg={4} display="flex">
            <LatestAlerts
              alerts={data?.latestAlerts || []}
              showUserName={true}
            />
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
                value={data?.totalDevices || 0}
                helperText="Total devices since the start"
              />
              <IndicationCard
                icon={<SensorsOutlined sx={iconStyle} />}
                title="Active Devices"
                value={data?.totalActiveDevices || 0}
                helperText="Total active devices in the last 7 days"
              />
            </Box>
          </Grid2>
          <Grid2 xs={12} md={6} lg={4} display="flex">
            <LocationChart location={data?.location || []} />
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
                value={data?.totalAlerts || 0}
                helperText="Total alerts in the last 7 days"
              />
              <IndicationCard
                icon={<ArticleOutlined sx={iconStyle} />}
                title="Total Readings"
                value={data?.totalReadings || 0}
                helperText="Total readings in the last 7 days"
              />
            </Box>
          </Grid2>
        </Grid2>
      )}
    </>
  );
};

export default Home;
