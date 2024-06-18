import { Box, Typography } from "@mui/material";
import PieChart from "@ui/PieChart";
const LocationChart = () => {
  return (
    <Box
      minHeight="260px"
      flex={1}
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <PieChart labels={["Egypt", "USA", "Jordan"]} series={[50, 30, 20]} />
      <Typography variant="subtitle1" position="absolute" fontWeight="600">
        Location
      </Typography>
    </Box>
  );
};

export default LocationChart;
