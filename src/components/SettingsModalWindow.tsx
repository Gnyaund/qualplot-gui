import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Paper } from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import RouterIcon from "@mui/icons-material/Router";

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
  const [path, setPath] = useState("");
  const [qpath, setqPath] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
    handleClickgetJSONData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  //2回目起動時に設定画面にpathが出ないので歯車押したときにIPCでパスを持ってくるようにすること
  //環境変数指定？でデフォルトパスを設定しておく　できるかわからん
  //Scenario FileのとことStartのとこに実行注は何かしらの変化をつけたい
  const handleClickgetJSONData = async () => {
    const data = await window.electronAPI.jsonShare();
    //console.log(data.qualnet_path)
    setPath(() => data.save);
    setqPath(() => data.qualnet_path);
  };
  const handleClickOpenFolder = async () => {
    const savePath: string = await window.electronAPI.openFolder("saveFolder");
    setPath(() => savePath);
  };

  const handleClickOpenQualNet = async () => {
    const qualPath: string = await window.electronAPI.openFile("qualpath");
    setqPath(() => qualPath);
  };
  /*
  const handleClickOpenJson = async () => {
    await window.electronAPI.openSettingJson();
  };
*/
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
          <Grid container spacing={3}>
            <Grid item xs={2} md={6}>
              <IconButton
                color="secondary"
                aria-label="settings"
                onClick={handleClickOpenFolder}
                size="large"
                sx={{ margin: 0.5 }}
              >
                <DriveFolderUploadOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={9} md={8}>
              <Paper sx={{ margin: 2 }}>{path}</Paper>
            </Grid>
            <Grid item xs={2} md={6}>
              <IconButton
                color="secondary"
                aria-label="settings"
                onClick={handleClickOpenQualNet}
                size="large"
                sx={{ margin: 0.5 }}
              >
                <RouterIcon />
              </IconButton>
            </Grid>
            <Grid item xs={9} md={8}>
              <Paper sx={{ margin: 2 }}>{qpath}</Paper>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
/*
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Save Changes
          </Button>
        </DialogActions>

            <Grid item md={6}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleClickOpenJson}
              >
                Open Setting.json
              </Button>
            </Grid>
        */
