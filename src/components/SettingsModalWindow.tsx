import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField, Box, Grid } from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
type Props = {
  showflag: boolean;
  setShowSettings: Function;
};
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapSettingWindow = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function SettingsModalWindow() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        color="secondary"
        aria-label="settings"
        onClick={handleClickOpen}
      >
        <SettingsApplicationsOutlinedIcon />
      </IconButton>
      <BootstrapDialog
        id="settings-window"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapSettingWindow id="settings-window" onClose={handleClose}>
          Settings
        </BootstrapSettingWindow>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={2} md={6}>
              <IconButton
                color="secondary"
                aria-label="settings"
                onClick={handleClickOpen}
                size="large"
                sx={{ margin: 0.5 }}
              >
                <DriveFolderUploadOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={9} md={8}>
              <TextField fullWidth label="Save to.." id="save-to" />
            </Grid>
          </Grid>
          <Box sx={{ width: 500, maxWidth: "100%" }}></Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Save Changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
