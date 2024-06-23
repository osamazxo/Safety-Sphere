import { FC, useState } from "react";
import { SortBy } from "../..";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddDeviceDialog from "./AddDeviceDialog";

const ConstrolBar: FC<{
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  searchValue: string;
  setSearchValue: (val: string) => void;
}> = ({ sortBy, setSortBy, searchValue, setSearchValue }) => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const handleSorting = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortBy);
  };

  return (
    <Box display="flex" alignItems="center" gap="8px" flexWrap="wrap">
      <TextField
        placeholder="Search Device by Username"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{
          flex: "5",
          minWidth: "200px",
        }}
        InputProps={{
          sx: {
            height: "40px",
          },
        }}
      />
      <Select
        labelId="sort-by"
        id="sort-by-select"
        value={sortBy}
        onChange={(e) => handleSorting(e)}
        sx={{
          minWidth: "200px",
          height: "40px",
          flex: 1,
        }}
      >
        <MenuItem value={"_id"}>Sort by id</MenuItem>
        <MenuItem value={"location"}>Sort by loction</MenuItem>
        <MenuItem value={"temperature"}>Sort by temperature</MenuItem>
        <MenuItem value={"humidity"}>Sort by humidity</MenuItem>
        <MenuItem value={"gas"}>Sort by gas</MenuItem>
        <MenuItem value={"vibration"}>Sort by vibration</MenuItem>
      </Select>
      <LoadingButton
        variant="contained"
        sx={{ flex: 1, minWidth: "150px" }}
        onClick={() => setDialogOpened(true)}
      >
        Add Device
      </LoadingButton>
      <AddDeviceDialog open={dialogOpened} setOpen={setDialogOpened} />
    </Box>
  );
};

export default ConstrolBar;
