import {
  DeleteOutlineOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { FC, MouseEventHandler, ReactNode, useState } from "react";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import EditDeviceDialog from "./EditDeviceDialog";
import { DeviceType } from "@api/devices";
import DeviceInfoDialog from "./DeviceInfoDialog";

const Item: FC<{
  text: string;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement> | undefined;
}> = ({ text, icon, onClick }) => {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText> {text}</ListItemText>
    </MenuItem>
  );
};
const DeviceMenu: FC<{
  device: DeviceType;
  anchorEl: null | HTMLElement;
  setAnchorEl: (val: null | HTMLElement) => void;
}> = ({ device, anchorEl, setAnchorEl }) => {
  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  // edit, delete, view info
  return (
    <>
      <Menu
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        slotProps={{ paper: { elevation: 3, sx: { borderRadius: "8px" } } }}
      >
        <Item
          icon={<VisibilityOutlined />}
          text="View Info"
          onClick={() => {
            setShowInfoDialog(true);
            setAnchorEl(null);
          }}
        />
        <Item
          icon={<EditOutlined />}
          text="Edit Device"
          onClick={() => {
            setShowEditDialog(true);
            setAnchorEl(null);
          }}
        />
        <Item
          icon={<DeleteOutlineOutlined />}
          text="Delete Device"
          onClick={() => {
            setShowDeleteDialog(true);
            setAnchorEl(null);
          }}
        />
      </Menu>
      <DeviceInfoDialog
        device={device}
        open={showInfoDialog}
        setOpen={setShowInfoDialog}
      />
      <EditDeviceDialog
        deviceId={device._id}
        open={showEditDialog}
        setOpen={setShowEditDialog}
      />
      <DeleteDeviceDialog
        deviceId={device._id}
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
      />
    </>
  );
};

export default DeviceMenu;
