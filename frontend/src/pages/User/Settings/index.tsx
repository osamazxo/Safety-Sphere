import { Box } from "@mui/material";
import Account from "./components/Account";
import Preferences from "./components/Preferences";
import { Helmet } from "react-helmet-async";
import PageTitle from "@ui/PageTitle";

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Settings | Safety Sphere</title>
      </Helmet>
      <Box>
        <PageTitle>Settings</PageTitle>
        <Account />
        <Preferences />
      </Box>
    </>
  );
};

export default Settings;
