import React, { useState } from "react";
import { AppBar, CssBaseline, Grid, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import "./../FrameToolBar.css";

const style = {
  "-webkit-app-region": "drag",
};

export default function FrameToolBar() {
  const quit = async () => {
    window.electronAPI.quitApp();
    console.log("hello?");
  };

  return (
    <div className="FrameToolBar">
      <AppBar
        position="static"
        sx={{
          height: 31,
          top: -15,
          width: 750,
          WebkitAppRegion: "drag",
          backgroundColor: "#343434",
        }}
      ></AppBar>
    </div>
  );
}
/*
        <Toolbar>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton size="small">
            <MinimizeIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={quit}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Toolbar>
*/
