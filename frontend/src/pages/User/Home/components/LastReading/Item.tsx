import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC, ReactElement } from "react";

export type ReadingItem = {
  value: number;
  title: string;
  icon: ReactElement;
  date: string;
  symbol?: string;
};
const Item: FC<{
  item: ReadingItem;
}> = ({ item }) => {
  return (
    <Grid2 xs={12} sm={6} md={3}>
      <Box
        sx={{
          background: (theme) => theme.palette.background.paper,
          borderRadius: "16px",
          border: "1px solid",
          borderColor: (theme) => theme.common.border,
          padding: "16px",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {item.title}
        </Typography>
        <Typography variant="h4" fontWeight="600" color="text.primary" my="4px">
          {item.value} {" " + (item.symbol || "")}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(item.date).toLocaleString("en-us", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    </Grid2>
  );
};

export default Item;
