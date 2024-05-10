import { FC } from "react";
import { Box, BoxProps } from "@mui/material";
const BoxWithBorder: FC<BoxProps> = ({ children, sx, ...others }) => {
  return (
    <Box
      sx={{
        padding: "1px",
        borderRadius: "8px",
        animation: "7s linear infinite border-animation",
        backgroundImage: (theme) =>
          `conic-gradient(from var(--border-angle) at 50% 50%, transparent, ${theme.palette.primary.main} 15%, transparent 20%)`,
        ...sx,
      }}
      {...others}
    >
      {children}
    </Box>
  );
};

export default BoxWithBorder;
