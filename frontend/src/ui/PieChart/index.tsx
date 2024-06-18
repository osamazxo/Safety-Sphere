import { FC } from "react";
import ApexChart from "react-apexcharts";
const PieChart: FC<{
  series: number[];
  labels: string[];
  height?: string;
}> = ({ series, labels, height = "300px" }) => {
  const options: ApexCharts.ApexOptions = {
    theme: {
      mode: "dark",
    },
    chart: {
      type: "donut",
      background: "inherit",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "55%",
        },
      },
    },
    labels,
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.7,
        },
      },
    },
    colors: ["#00a4d0", "#ed7d31", "#d9008b"],
    stroke: {
      colors: ["#0b0d11"],
    },
  };
  return (
    <ApexChart options={options} height={height} series={series} type="donut" />
  );
};

export default PieChart;
