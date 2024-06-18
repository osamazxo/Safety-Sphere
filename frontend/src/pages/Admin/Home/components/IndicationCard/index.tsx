import { HelpOutline } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

const IndicationCard: FC<{
  icon: ReactNode;
  title: string;
  value: number;
  helperText?: string;
}> = ({ icon, title, value, helperText }) => {
  return (
    <Box
      p="16px"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "8px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pb="8px"
        mb="8px"
        sx={{
          borderBottom: (theme) => "1px solid " + theme.common.border,
        }}
      >
        <Box display="flex" gap="8px" alignItems="center">
          {icon}
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
        </Box>
        {helperText && (
          <Tooltip title={helperText}>
            <HelpOutline fontSize="small" sx={{ color: "text.secondary" }} />
          </Tooltip>
        )}
      </Box>
      <Typography variant="h4" py="8px">
        {value}
      </Typography>
    </Box>
  );
};

export default IndicationCard;
