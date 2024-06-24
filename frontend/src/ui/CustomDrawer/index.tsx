import { Box } from "@mui/material";
import { FC } from "react";
import Item, { DrawerItem } from "./Item";
import useGetParams from "@hooks/useGetParams";
import Header from "./Header";

const CustomDrawer: FC<{
  items: DrawerItem[];
}> = ({ items }) => {
  const params = useGetParams();
  let activeItem = params[0].toLowerCase();
  if (activeItem === "user" || activeItem === "admin") activeItem = "home";
  return (
    <Box
      className="main-drawer"
      sx={{
        width: { xs: "100%", sm: "350px" },
        minHeight: "100vh",
        backgroundColor: "background.paper",
        display: { xs: "none", sm: "flex" },
        position: { xs: "fixed", sm: "relative" },
        flexDirection: "column",
        "&.open": {
          display: "flex",
          zIndex: "1000",
        },
      }}
    >
      <Header />
      <Box display="flex" flexDirection="column" gap="8px" px="16px">
        {items.map((item) => (
          <Item
            key={item.title}
            item={item}
            active={item.title.toLowerCase() === activeItem}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CustomDrawer;
