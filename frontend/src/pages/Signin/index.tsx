import { Box } from "@mui/material";
import SigninForm from "./components/SigninForm";

const Signin = () => {
  return (
    <Box
      className="f-center-center"
      sx={{
        height: "100%",
        width: "100%",
        flex: 1,
      }}
    >
      <SigninForm />
    </Box>
  );
};

export default Signin;
