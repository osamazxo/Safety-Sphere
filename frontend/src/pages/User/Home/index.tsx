import { Box } from "@mui/material";
import LastReading from "./components/LastReading";
import { Helmet } from "react-helmet-async";
import WelcomeCard from "./components/WelcomeCard";

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
        <LastReading />
      </Box>
    </>
  );
};

export default Home;
