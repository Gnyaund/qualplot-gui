import { AppBar } from "@mui/material";
import "./../FrameToolBar.css";

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
