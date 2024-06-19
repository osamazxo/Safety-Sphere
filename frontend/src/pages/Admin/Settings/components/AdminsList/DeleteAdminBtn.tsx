import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC, useState } from "react";
import DeleteAdminDialog from "./DeleteAdminDialog";

const DeleteAdminBtn: FC<{ userId: string }> = ({ userId }) => {
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  return (
    <>
      <IconButton sx={{ padding: "4px" }} onClick={() => setDialogOpened(true)}>
        <DeleteOutline color="error" />
      </IconButton>
      <DeleteAdminDialog
        open={dialogOpened}
        setOpen={setDialogOpened}
        userId={userId}
      />
    </>
  );
};

export default DeleteAdminBtn;
