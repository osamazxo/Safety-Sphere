import { Box } from "@mui/material";
import AreaChart from "@ui/AreaChart";
import CustomTable, { HeadCell } from "@ui/CustomTable";

const headCells: HeadCell[] = [
  {
    id: "date",
    label: "Date",
    numeric: false,
  },
  {
    id: "min",
    label: "Minimum",
    numeric: true,
  },
  {
    id: "average",
    label: "Average",
    numeric: true,
  },
  {
    id: "max",
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
  min: number,
  average: number,
  max: number,
  alerts: number
) => ({
  id,
  date,
  min,
  average,
  max,
  alerts,
});
const HumidityTab = () => {
  return (
    <Box>
      <AreaChart
        label="Humidity"
        name="humidity"
        data={[1, 2, 3]}
        categories={["sun", "mon", "thur"]}
      />
      <CustomTable
        title={"Monthly Statics"}
        headCells={headCells}
        rows={[
          createData("1", "55", 1, 5, 10, 2),
          createData("1", "55", 3, 5, 10, 2),
          createData("1", "55", 2, 5, 10, 2),
        ]}
      />
    </Box>
  );
};

export default HumidityTab;
