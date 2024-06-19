import { Box } from "@mui/material";
import Account from "@pages/User/Settings/components/Account";
import PageTitle from "@ui/PageTitle";
import { Helmet } from "react-helmet-async";
import AdminsList from "./components/AdminsList";

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Settings | Safety Sphere</title>
      </Helmet>
      <Box>
        <PageTitle>Settings</PageTitle>
        <Account maxWidth="800px" />
        <AdminsList />
      </Box>
    </>
  );
};

export default Settings;
