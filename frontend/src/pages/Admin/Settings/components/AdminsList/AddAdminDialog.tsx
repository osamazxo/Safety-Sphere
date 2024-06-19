import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";

const AddAdminDialog: FC<{
  open: boolean;
  setOpen: (val: boolean) => void;
}> = ({ open, setOpen }) => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required().min(4),
      password: Yup.string().required().min(8),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: { width: "360px", borderRadius: "8px" },
        elevation: 3,
      }}
    >
      <DialogTitle>Add New Admin</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          pb: 0,
        }}
      >
        <Box position="relative">
          <TextField
            placeholder="Username"
            fullWidth
            id="userName"
            value={formik.values.userName}
            error={!!formik.errors.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputProps={{
              autoComplete: "new-password",
            }}
          />
        </Box>
        <Box position="relative">
          <TextField
            placeholder="Password"
            fullWidth
            id="password"
            type="password"
            value={formik.values.password}
            error={!!formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputProps={{
              autoComplete: "new-password",
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={() => setOpen(false)}>Cancel</LoadingButton>
        <LoadingButton onClick={() => formik.handleSubmit()}>Add</LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddAdminDialog;
