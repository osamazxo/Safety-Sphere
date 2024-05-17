import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
export type ActivityItem = {
  img: string;
  title: string;
  description: string;
  date: string;
};
const LatestActivities = () => {
  const activities: ActivityItem[] = [
    // { img: "", title: "", description: "", date: "" },
  ];
  return (
    <Grid2 xs={12} md={4}>
      <Box
        padding="16px"
        className="f-column"
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "16px",
          height: "100%",
        }}
      >
        <Typography variant="h6" color="text.primary">
          Latest Activities
        </Typography>
        <Box
          className="f-column"
          gap="16px"
          flex="1"
          justifyContent={activities.length === 0 ? "center" : "flex-start"}
          alignItems={activities.length === 0 ? "center" : "flex-start"}
          minHeight="300px"
        >
          {activities.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              You don't have new activities!
            </Typography>
          )}
        </Box>
      </Box>
    </Grid2>
  );
};

export default LatestActivities;
