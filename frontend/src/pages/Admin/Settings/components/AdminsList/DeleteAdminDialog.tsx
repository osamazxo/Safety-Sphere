import { useDeleteAdmin } from "@api/auth";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

const DeleteAdminDialog: FC<{
  open: boolean;
  setOpen: (val: boolean) => void;
  userName: string;
}> = ({ open, setOpen, userName }) => {
  const { mutate: deleteAdmin, isLoading: deletingAdmin } = useDeleteAdmin();
  const handleDelete = () => {
    deleteAdmin({ userName });
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: { width: "360px", borderRadius: "8px" },
        elevation: 3,
      }}
    >
      <DialogTitle>Delete Admin</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          pb: 0,
        }}
      >
        <DialogContentText>
          Are you sure you want to delete this admin?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={() => setOpen(false)}>Cancel</LoadingButton>
        <LoadingButton
          color="error"
          loading={deletingAdmin}
          onClick={handleDelete}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAdminDialog;
