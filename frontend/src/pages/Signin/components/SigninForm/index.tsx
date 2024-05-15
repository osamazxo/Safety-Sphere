import { useSignin } from "@api/auth";
import { LockOutlined, PersonOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import BoxWithBorder from "@ui/BoxWithBorder";
import { FormikProps, useFormik } from "formik";
import { ReactElement } from "react";
import * as Yup from "yup";

const CustomTextField = ({
  id,
  icon,
  placeholder,
  formik,
}: {
  id: "password" | "userName";
  icon: ReactElement;
  placeholder: string;
  formik: FormikProps<{
    userName: string;
    password: string;
  }>;
}) => {
  return (
    <TextField
      fullWidth
      id={id}
      value={formik.values[id]}
      type={id === "password" ? "password" : "text"}
      placeholder={placeholder}
      InputProps={{
        startAdornment: icon,
      }}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={formik.touched[id] && formik.errors[id]}
      error={formik.errors[id] !== undefined && formik.touched[id]}
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: "background.default",
        },
        "& fieldset": {
          display: "none",
        },
      }}
    />
  );
};

const SigninForm = () => {
  const { mutate: signin, isLoading } = useSignin();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      signin(values);
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().min(4).required("Username is required"),
      password: Yup.string().min(6).required("Password is required"),
    }),
  });

  return (
    <BoxWithBorder width="100%" maxWidth="360px">
      <Box
        className="f-column"
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          backgroundColor: "background.paper",
          padding: "48px 16px",
          borderRadius: "8px",
          width: "100%",
          alignItems: "center",
          gap: "16px",
          border: "1px solid",
          borderColor: (theme) => theme.common.border,
        }}
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{
            height: "50px",
            width: "fit-content",
          }}
        />
        <Typography variant="h5" fontWeight="400">
          Welcome Back
        </Typography>
        <CustomTextField
          placeholder="Username"
          id="userName"
          formik={formik}
          icon={
            <PersonOutline
              fontSize="small"
              sx={{
                color: "text.secondary",
              }}
            />
          }
        />
        <CustomTextField
          placeholder="Password"
          id="password"
          formik={formik}
          icon={
            <LockOutlined
              fontSize="small"
              sx={{
                color: "text.secondary",
              }}
            />
          }
        />
        <LoadingButton
          variant="contained"
          disableElevation
          fullWidth
          type="submit"
          loading={isLoading}
          sx={{
            mt: "8px",
          }}
        >
          Signin
        </LoadingButton>
      </Box>
    </BoxWithBorder>
  );
};

export default SigninForm;
