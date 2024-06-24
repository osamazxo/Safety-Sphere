import { Box } from "@mui/material";
import LastReading from "./components/LastReading";
import { Helmet } from "react-helmet-async";
import WelcomeCard from "./components/WelcomeCard";
import TemperatueChart from "./components/TemperatueChart";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import LatestAlerts from "@pages/Admin/Home/components/LatestAlerts";
import { useGetUserDashboard } from "@api/dashboard";
import Spinner from "@ui/Spinner";

const Home = () => {
  const { data, isLoading, isError } = useGetUserDashboard();
  return (
    <>
      <Helmet>
        <title>Dashboard | Safety Sphere</title>
      </Helmet>
      {isLoading ? (
        <Spinner sx={{ height: "100vh" }} />
      ) : isError ? (
        ""
      ) : (
        <Box
          sx={{
            userSelect: "none",
          }}
        >
          <WelcomeCard userName={data?.userName || "-"} />
          <Grid2 container my="16px" spacing="16px">
            <LastReading reading={data?.lastReading} />
            <TemperatueChart series={data?.averageTempSeries || []} />
            <Grid2 xs={12} md={4}>
              <LatestAlerts
                alerts={data?.latestAlerts || []}
                sx={{ p: 0, maxHeight: "350px", flex: 1 }}
              />
            </Grid2>
          </Grid2>
        </Box>
      )}
    </>
  );
};

export default Home;
