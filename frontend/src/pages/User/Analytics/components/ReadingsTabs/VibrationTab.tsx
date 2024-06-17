import { Box } from "@mui/material";
import CustomTable, { HeadCell } from "@ui/CustomTable";
const headCells: HeadCell[] = [
  {
    id: "date",
    label: "Date",
    numeric: false,
  },
  {
    id: "startTime",
    label: "Start Time",
    numeric: false,
  },
  {
    id: "endTime",
    label: "End Time",
    numeric: false,
  },
];
const createData = (
  id: string,
  date: string,
  startTime: string,
  endTime: string
) => ({ id, date, startTime, endTime });
const VibrationTab = () => {
  return (
    <Box maxWidth={"800px"} my="16px">
      <CustomTable
        title="Vibration"
        headCells={headCells}
        rows={[createData("1", "Sunday", "05:20pm", "05:30pm")]}
      />
    </Box>
  );
};

export default VibrationTab;
