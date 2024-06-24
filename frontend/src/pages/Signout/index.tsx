import Spinner from "@ui/Spinner";
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
  return <Spinner sx={{ height: "100vh" }} />;
};

export default Signout;
