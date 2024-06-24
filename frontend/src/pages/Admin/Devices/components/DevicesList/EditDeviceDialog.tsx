import { useEditDevice } from "@api/devices";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";

const EditDeviceDialog: FC<{
  deviceId: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}> = ({ deviceId, open, setOpen }) => {
  const { mutate: updateDevice } = useEditDevice(() => {
    setOpen(false);
    formik.resetForm();
  });

  const formik = useFormik<{ password?: string; secret?: string }>({
    initialValues: {
      secret: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      secret: Yup.string().min(8),
      password: Yup.string().min(8),
    }),
    onSubmit: (values) => {
      const updatedValues = { ...values };
      if (values.password === "") updatedValues.password === undefined;
      if (values.secret === "") updatedValues.secret = undefined;
      if (values.password !== "" || values.secret !== "")
        updateDevice({ deviceId, ...values });
    },
  });
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
        elevation: 3,
        sx: {
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle>Edit Device</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="secret"
          placeholder="New Secret"
          value={formik.values.secret}
          onChange={formik.handleChange}
          error={!!formik.errors.secret}
          helperText={!!formik.errors.secret && formik.errors.secret}
          sx={{ mb: "8px" }}
        />
        <TextField
          fullWidth
          id="password"
          placeholder="New Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={!!formik.errors.password}
          helperText={!!formik.errors.password && formik.errors.password}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton type="button" onClick={() => setOpen(false)}>
          Cancel
        </LoadingButton>
        <LoadingButton type="submit">Save</LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditDeviceDialog;
