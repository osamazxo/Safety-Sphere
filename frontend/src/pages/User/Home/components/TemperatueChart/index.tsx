import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import AreaChart from "@ui/AreaChart";
import { getLastDates } from "@util/dateHelpers";
import { FC } from "react";
const last7days = getLastDates(7);
const TemperatueChart: FC<{ series: { date: string; average: number }[] }> = ({
  series,
}) => {
  const modifiedSeries: { [key: string]: number } = {};
  series.forEach(
    (ele) =>
      (modifiedSeries[new Date(ele.date).toISOString().slice(0, 10)] =
        ele.average)
  );
  return (
    <Grid2 xs={12} md={8}>
      <AreaChart
        name="average temperature"
        label="Average Temperatue"
        height="360px"
        categories={last7days}
        data={last7days.map((ele) => modifiedSeries[ele] || 0)}
      />
    </Grid2>
  );
};

export default TemperatueChart;
