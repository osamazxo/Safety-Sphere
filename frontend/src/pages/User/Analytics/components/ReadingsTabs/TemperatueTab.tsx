import { MonthlyStatics } from "@api/analytics";
import { Box } from "@mui/material";
import AreaChart from "@ui/AreaChart";
import CustomTable, { HeadCell } from "@ui/CustomTable";
import { getLastDates } from "@util/dateHelpers";

const headCells: HeadCell[] = [
  {
    id: "date",
    label: "Date",
    numeric: false,
  },
  {
    id: "minTemp",
    label: "Minimum",
    numeric: true,
  },
  {
    id: "averageTemp",
    label: "Average",
    numeric: true,
  },
  {
    id: "maxTemp",
    label: "Maximum",
    numeric: true,
  },
  {
    id: "alerts",
    label: "Total Alerts",
    numeric: true,
  },
];
const createData = (
  id: string,
  date: string,
  minTemp: number,
  averageTemp: number,
  maxTemp: number,
  alerts: number
) => ({
  id,
  date: new Date(date).toLocaleString("en-us", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  minTemp,
  averageTemp,
  maxTemp,
  alerts,
});
const last30days = getLastDates(30);
const TemperatueTab = ({ data }: { data?: MonthlyStatics }) => {
  const modifiedSeries: { [key: string]: number } = {};
  data?.forEach((ele) => {
    modifiedSeries[new Date(ele.date).toISOString().slice(0, 10)] =
      ele?.series?.count === 0
        ? 0
        : (ele.series?.sum || 0) / (ele.series?.count || 1);
  });
  return (
    <Box display="flex" flexDirection="column" gap="16px" mt="16px">
      <AreaChart
        label="Temperature"
        name="temperature"
        data={last30days.map((ele) => modifiedSeries[ele] || 0)}
        categories={last30days}
      />
      <CustomTable
        title={"Monthly Statics"}
        headCells={headCells}
        rows={
          data?.map((ele) =>
            createData(
              ele.date,
              ele.date,
              ele.series?.minimum || 0,
              (ele.series?.sum || 0) / (ele.series?.count || 1),
              ele.series?.maximum || 0,
              ele.series?.alerts.length || 0
            )
          ) || []
        }
      />
    </Box>
  );
};

export default TemperatueTab;
