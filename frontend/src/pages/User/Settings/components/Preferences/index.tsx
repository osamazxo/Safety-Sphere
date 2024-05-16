import { LoadingButton } from "@mui/lab";
import { Box, Switch, Typography } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { FC } from "react";
const CheckInput: FC<{
  label: string;
  id: "gasNotify" | "vibrationNotify";
  formik: FormikProps<{
    gasNotify: boolean;
    vibrationNotify: boolean;
  }>;
}> = ({ label, id, formik }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography>{label}</Typography>
      <Switch
        onChange={(e) => formik.setFieldValue(id, e.target.checked)}
        checked={formik.values[id]}
      />
    </Box>
  );
};
const Preferences = () => {
  const formik = useFormik({
    initialValues: {
      gasNotify: false,
      vibrationNotify: true,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: "1px solid",
        borderColor: (theme) => theme.common.border,
        backgroundColor: "background.paper",
        my: "16px",
        p: "16px",
        maxWidth: "600px",
      }}
    >
      <Box>
        <Typography variant="h6" color="text.primary">
          Preferences
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select your prefernces below.
        </Typography>
      </Box>
      <Box
        mt="16px"
        className="f-column"
        gap="8px"
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <CheckInput
          id="gasNotify"
          label="Email me when there is a gas leak."
          formik={formik}
        />
        <CheckInput
          id="vibrationNotify"
          label="Email me when there is a vibration."
          formik={formik}
        />
        <LoadingButton
          variant="outlined"
          type="submit"
          sx={{
            alignSelf: "flex-end",
            width: "fit-content",
            mt: "16px",
          }}
        >
          Save Changes
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Preferences;
