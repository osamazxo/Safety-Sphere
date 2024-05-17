import { Box } from "@mui/material";
import LastReading from "./components/LastReading";
import { Helmet } from "react-helmet-async";
import WelcomeCard from "./components/WelcomeCard";
import TemperatueChart from "./components/TemperatueChart";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import LatestActivities from "./components/LatestActivities";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Safety Sphere</title>
      </Helmet>
      <Box
        sx={{
          userSelect: "none",
        }}
      >
        <WelcomeCard />
        <Grid2 container my="16px" spacing="16px">
          <LastReading />
          <TemperatueChart />
          <LatestActivities />
        </Grid2>
      </Box>
    </>
  );
};

export default Home;
