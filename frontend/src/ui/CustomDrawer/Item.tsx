import { Box, Typography } from "@mui/material";
import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

export type DrawerItem = {
  title: string;
  url: string;
  icon: ReactElement;
};

const Item: FC<{
  active: boolean;
  item: DrawerItem;
}> = ({ active, item }) => {
  return (
    <Box
      component={Link}
      to={item.url}
      onClick={() => {
        document.querySelector(".main-drawer")?.classList.toggle("open");
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        p: "8px 16px",
        color: active ? "background.paper" : "text.secondary",
        userSelect: "none",
        borderRadius: "8px",
        backgroundColor: active ? "primary.main" : "background.paper",
        "&:hover": {
          backgroundColor: active ? "primary.main" : "action.hover",
        },
      }}
    >
      {item.icon} <Typography variant="subtitle1">{item.title}</Typography>
    </Box>
  );
};

export default Item;
