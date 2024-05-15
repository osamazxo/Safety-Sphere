import { Box, Typography } from "@mui/material";
import { FC } from "react";
import Item, { DrawerItem } from "./Item";
import useGetParams from "@hooks/useGetParams";

const CustomDrawer: FC<{
  items: DrawerItem[];
}> = ({ items }) => {
  const params = useGetParams();
  let activeItem = params[0].toLowerCase();
  if (activeItem === "user") activeItem = "home";
  return (
    <Box
      sx={{
        width: { xs: "350px" },
        minHeight: "100vh",
        backgroundColor: "background.paper",
        p: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        gap="16px"
        alignItems="center"
        mb="16px"
        pb="24px"
        pt="8px"
        sx={{
          borderBottom: "1px solid",
          borderColor: (theme) => theme.palette.divider,
        }}
      >
        <img src="/logo.png" alt="website logo" style={{ width: "36px" }} />
        <Typography variant="h5" fontWeight="600">
          Safety Sphere
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="8px">
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
