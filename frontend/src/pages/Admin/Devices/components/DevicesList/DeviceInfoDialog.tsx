import { DeviceType } from "@api/devices";
import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";

const DeviceInfoDialog: FC<{
  device: DeviceType;
  open: boolean;
  setOpen: (val: boolean) => void;
}> = ({ device, open, setOpen }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: "8px",
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <DialogTitle>Device Info</DialogTitle>
        <IconButton
          sx={{ p: "4px", mr: "16px" }}
          onClick={() => setOpen(false)}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>Device ID: {device._id}</Typography>
        <Typography>Username: {device.user?.userName}</Typography>
        <Typography>Device Secret: {device.secret}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceInfoDialog;
