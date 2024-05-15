import { Box } from "@mui/material";
import LastReading from "./components/LastReading";

const Home = () => {
  return (
    <Box
      sx={{
        userSelect: "none",
      }}
    >
      <LastReading />
    </Box>
  );
};

export default Home;
