import { useAddDevice } from "@api/devices";
import { Autorenew } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, MouseEventHandler } from "react";
import * as Yup from "yup";
function generatePass() {
  let pass = "";
  const str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    const char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }

  return pass;
}
const AutoFill: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: "4px",
        top: "50%",
        transform: "translateY(-50%)",
        p: "4px",
      }}
    >
      <Autorenew fontSize="small" />
    </IconButton>
  );
};
const AddDeviceDialog: FC<{
  open: boolean;
  setOpen: (val: boolean) => void;
}> = ({ open, setOpen }) => {
  const { mutate: addDevice, isLoading: addingDevice } = useAddDevice(() => {
    setOpen(false);
    formik.resetForm();
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required().min(6),
      password: Yup.string().required().min(8),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      addDevice(values);
    },
  });
  const handleGeneratePass = () => {
    const newPass = generatePass();
    formik.setFieldValue("password", newPass);
  };
  const handleGenerateUsername = () => {
    const newUsername = (new Date().getTime() + "").slice(5);
    formik.setFieldValue("userName", newUsername);
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
      <DialogTitle>Add New Device</DialogTitle>
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
          <AutoFill onClick={handleGenerateUsername} />
        </Box>
        <Box position="relative">
          <TextField
            placeholder="Password"
            fullWidth
            id="password"
            value={formik.values.password}
            error={!!formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputProps={{
              autoComplete: "new-password",
            }}
          />
          <AutoFill onClick={handleGeneratePass} />
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={() => setOpen(false)}>Cancel</LoadingButton>
        <LoadingButton
          loading={addingDevice}
          onClick={() => formik.handleSubmit()}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddDeviceDialog;
