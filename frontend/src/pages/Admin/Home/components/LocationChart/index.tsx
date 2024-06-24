import { Box, Typography } from "@mui/material";
import PieChart from "@ui/PieChart";
import { FC } from "react";
const LocationChart: FC<{ location: { _id: string; total: number }[] }> = ({
  location,
}) => {
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
      <PieChart
        labels={location.map((ele) => ele._id)}
        series={location.map((ele) => ele.total)}
      />
      <Typography variant="subtitle1" position="absolute" fontWeight="600">
        Location
      </Typography>
    </Box>
  );
};

export default LocationChart;
