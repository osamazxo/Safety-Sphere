import { Box } from "@mui/material";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    queryClient.clear();
    navigate("/signin");
  }, [navigate, queryClient]);
  return (
    <Box className="f-center-center" minHeight="100vh">
      <div className="loader" />
    </Box>
  );
};

export default Signout;
