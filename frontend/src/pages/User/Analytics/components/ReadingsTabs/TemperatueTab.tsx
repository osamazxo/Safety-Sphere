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
  date,
  minTemp,
  averageTemp,
  maxTemp,
  alerts,
});
const TemperatueTab = () => {
  return (
    <Box>
      <AreaChart
        label="Temperature"
        name="temperature"
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

export default TemperatueTab;
