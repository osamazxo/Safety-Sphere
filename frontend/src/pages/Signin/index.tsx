import { Box } from "@mui/material";
import SigninForm from "./components/SigninForm";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Sign in | Safety Sphere</title>
      </Helmet>
      <Box
        className="f-center-center"
        sx={{
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <SigninForm />
      </Box>
    </>
  );
};

export default Signin;
