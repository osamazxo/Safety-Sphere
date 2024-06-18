import { Box, Typography, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { FC } from "react";
import Chart from "react-apexcharts";
const AreaChart: FC<{
  name: string;
  data: number[];
  categories: string[];
  label: string;
  offset?: number;
  height?: string;
}> = ({ name, data, categories, label, offset = 0, height = "360px" }) => {
  const theme = useTheme();
  const series = [
    {
      name,
      type: "area",
      data,
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
      categories,
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
      min: Math.min(...series[0].data) - offset,
      max: Math.max(...series[0].data) + offset,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "16px",
        p: "16px 8px 0px",
      }}
    >
      <Typography variant="h6" px="8px">
        {label}
      </Typography>
      <Chart options={options} series={series} height={height} />
    </Box>
  );
};

export default AreaChart;
