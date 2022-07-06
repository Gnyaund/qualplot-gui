import { app, BrowserWindow, ipcMain, dialog, IpcMainInvokeEvent } from "electron";
import * as path from "path";
import * as url from "url";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file",
        slashes: true,
      })
    : "http://localhost:3000";

  win.loadURL(appURL);

  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }

};

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(null)
  if(canceled){
    return 0;
  }else{
    return filePaths[0];
  }
}


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen)
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

