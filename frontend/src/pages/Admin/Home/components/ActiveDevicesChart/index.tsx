import AreaChart from "@ui/AreaChart";
import { FC } from "react";

const ActiveDevicesChart: FC<{
  categories: string[];
  series: number[];
}> = ({ categories, series }) => {
  return (
    <AreaChart
      label="Active Devices"
      name="active devices"
      categories={categories}
      data={series}
      height="260px"
    />
  );
};

export default ActiveDevicesChart;
