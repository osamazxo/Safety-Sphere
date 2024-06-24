import { MonthlyStatics } from "@api/analytics";
import { Box } from "@mui/material";
import CustomTable, { HeadCell } from "@ui/CustomTable";

type DataRowType = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
};

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
) => ({
  id,
  date: new Date(date).toLocaleString("en-us", {
    day: "2-digit",
    weekday: "short",
    month: "short",
    year: "numeric",
  }),
  startTime: new Date(startTime).toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  endTime: new Date(endTime).toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  }),
});
const VibrationTab = ({ data }: { data?: MonthlyStatics }) => {
  const alerts: DataRowType[] = [];
  data?.forEach((ele) =>
    ele.alerts?.forEach((alert) =>
      alerts.push(
        createData(ele.date, ele.date, alert.startTime, alert.endTime)
      )
    )
  );

  return (
    <Box maxWidth={"800px"} my="16px">
      <CustomTable title="Vibration" headCells={headCells} rows={alerts} />
    </Box>
  );
};

export default VibrationTab;
