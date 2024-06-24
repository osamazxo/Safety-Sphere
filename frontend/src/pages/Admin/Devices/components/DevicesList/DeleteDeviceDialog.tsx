import { useDeleteDevice } from "@api/devices";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

const DeleteDeviceDialog: FC<{
  deviceId: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}> = ({ deviceId, open, setOpen }) => {
  const { mutate: deleteDevice, isLoading: deletingDevice } = useDeleteDevice(
    () => {
      setOpen(false);
    }
  );
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
      <DialogTitle>Delete Device</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this device?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={() => setOpen(false)}>Cancel</LoadingButton>
        <LoadingButton
          color="error"
          loading={deletingDevice}
          onClick={() => deleteDevice({ deviceId })}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDeviceDialog;
