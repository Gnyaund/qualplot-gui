import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  IpcMainInvokeEvent,
} from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";
import qualplot from "./../json/qualplot.json";

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
  const { canceled, filePaths } = await dialog.showOpenDialog(null);
  if (canceled) {
    return 0;
  } else {
    qualplot.scenario_file_path = filePaths[0];
    const settings: string | ArrayBufferView = JSON.stringify(
      qualplot,
      undefined,
      4
    );
    fs.writeFileSync("./json/qualplot.json", settings);
    return filePaths[0];
  }
};

const numReminder: any = async (args) => {
  const num = args;
  qualplot.start_seed = num;
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.handle("get:decideNum", (event, args) => {
    numReminder(args);
  });
  /*
  ipcMain.on("st-num", (event, arg) => {
    const num = arg;
    qualplot.start_seed = arg;
  });
  ipcMain.on("end-num", (event, arg) => {
    const num = arg;
    qualplot.end_seed = arg;
  });
  ipcMain.on("max-node", (event, arg) => {
    const num = arg;
    qualplot.max_node = arg;
  });
  */
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
