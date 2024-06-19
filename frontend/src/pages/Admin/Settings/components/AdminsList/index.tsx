import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import CustomTable, { HeadCell } from "@ui/CustomTable";
import { ReactNode, useState } from "react";
import DeleteAdminBtn from "./DeleteAdminBtn";
import AddAdminDialog from "./AddAdminDialog";

const headCells: HeadCell[] = [
  {
    id: "username",
    label: "Username",
    numeric: false,
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
  },
  {
    id: "lastSeen",
    label: "Last Seen",
    numeric: false,
  },
  {
    id: "actions",
    label: "Actions",
    numeric: false,
  },
];
const createData = (
  id: string,
  username: string,
  email: string,
  lastSeen: string,
  actions: ReactNode
) => ({
  id,
  username,
  email,
  lastSeen: new Date(lastSeen).toLocaleDateString("en-us", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }),
  actions,
});
const AdminsList = () => {
  const [addAdminOpened, setAddAdminOpened] = useState<boolean>(false);
  return (
    <Box maxWidth="800px">
      <CustomTable
        title="Admins List"
        showHeader={false}
        headCells={headCells}
        startSlot={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="16px"
          >
            <Typography variant="h6">Admins List</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddAdminOpened(true)}
            >
              Add Admin
            </Button>
          </Box>
        }
        rows={[
          createData(
            "1",
            "osama",
            "osamazxo@outlook.com",
            new Date().toISOString(),
            <DeleteAdminBtn userId="123" />
          ),
          createData(
            "2",
            "ahmed",
            "ahmed@outlook.com",
            new Date().toISOString(),
            <DeleteAdminBtn userId="234" />
          ),
        ]}
      />
      <AddAdminDialog open={addAdminOpened} setOpen={setAddAdminOpened} />
    </Box>
  );
};

export default AdminsList;
