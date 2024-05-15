import { Box } from "@mui/material";
import LastReading from "./components/LastReading";
import { Helmet } from "react-helmet-async";

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
        <LastReading />
      </Box>
    </>
  );
};

export default Home;
