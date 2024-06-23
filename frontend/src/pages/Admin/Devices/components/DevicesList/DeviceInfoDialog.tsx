import { DeviceType } from "@api/devices";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

const DeviceInfoDialog: FC<{
  device: DeviceType;
  open: boolean;
  setOpen: (val: boolean) => void;
}> = ({ device, open, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Device Info</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this device?
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceInfoDialog;
