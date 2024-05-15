import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  }, [navigate]);
  return (
    <Box className="f-center-center" minHeight="100vh">
      <div className="loader" />
    </Box>
  );
};

export default Signout;
