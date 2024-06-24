import { Box, SxProps } from "@mui/material";
import { FC } from "react";

const Spinner: FC<{
  sx?: SxProps;
}> = ({ sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      <div className="loader" />
    </Box>
  );
};

export default Spinner;
