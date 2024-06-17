import { Box } from "@mui/material";
import PageTitle from "@ui/PageTitle";
import { Helmet } from "react-helmet-async";
import ReadingTabs from "./components/ReadingsTabs";

const Analytics = () => {
  return (
    <>
      <Helmet>
        <title>Analytics | Safety Sphere</title>
      </Helmet>
      <Box>
        <PageTitle>Analytics</PageTitle>
        <ReadingTabs />
      </Box>
    </>
  );
};

export default Analytics;
