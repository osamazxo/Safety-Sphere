import { Box, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
const TemperatueChart = () => {
  const theme = useTheme();
  const series = [
    {
      name: "temperature",
      type: "area",
      data: [35, 42, 37, 42, 38],
    },
  ];
  const options: ApexOptions = {
    theme: {
      mode: "dark",
    },
    chart: {
      id: "temperature-chart",
      type: "area",
      background: "inherit",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.9,
        opacityTo: 0.3,
        stops: [20],
      },
    },
    grid: {
      borderColor: "#222",
    },
    markers: {},
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu"],
      axisBorder: {
        color: "#444",
      },
      axisTicks: {
        color: "#444",
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      min: Math.min(...series[0].data) - 5,
      max: Math.max(...series[0].data) + 5,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
  return (
    <Grid2 xs={12} md={8}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "16px",
          p: "16px 8px 0px",
        }}
      >
        <Typography variant="h6" px="8px">
          Average Temperatue
        </Typography>
        <Chart options={options} series={series} height="360px" />
      </Box>
    </Grid2>
  );
};

export default TemperatueChart;
