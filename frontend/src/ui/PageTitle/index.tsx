import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";

const PageTitle: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <Typography
      variant="h5"
      className="page-title"
      display="flex"
      alignItems="center"
      height={{ xs: "auto", sm: "90px" }}
      mb={{ xs: "16px", sm: "0" }}
    >
      {children}
    </Typography>
  );
};

export default PageTitle;
