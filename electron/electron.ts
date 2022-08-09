import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  IpcMainInvokeEvent,
  shell,
} from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";
import qualplot from "./../json/qualplot.json";
import * as ChildProcess from "child_process";
import { Buffer } from "buffer";
import { screen } from "electron";
const createWindow = () => {
  let win = new BrowserWindow({
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#464646",
      symbolColor: "#FFFFFF",
    },

    width: 800,
    height: 500,

    maxWidth: 801,
    maxHeight: 501,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
  });
  //    frame: false
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

const handleFileOpen = async (identifier: string) => {
  const { canceled, filePaths } = await dialog.showOpenDialog(null);
  if (canceled) return 0;
  else {
    if (identifier === "scenarioPath") setScenarioFile(filePaths[0]);
    if (identifier === "qualpath") setQualnetExePath(filePaths[0]);

    return filePaths[0];
  }
};

const handleFolderOpen = async (identifier: string) => {
  const { canceled, filePaths } = await dialog.showOpenDialog(null, {
    properties: ["openDirectory"],
  });
  if (canceled) return 0;
  else {
    if (identifier === "saveFolder") setSaveFolder(filePaths[0]);
  }
  console.log(filePaths[0]);
  return filePaths[0];
};

const setSaveFolder = async (filePath: string) => {
  qualplot.save = filePath;
  const settings: string | ArrayBufferView = JSON.stringify(
    qualplot,
    undefined,
    4
  );
  fs.writeFileSync("./json/qualplot.json", settings);
  return filePath;
};

const setScenarioFile = async (filePath: string) => {
  qualplot.scenario_file_path = filePath;
  const settings: string | ArrayBufferView = JSON.stringify(
    qualplot,
    undefined,
    4
  );
  fs.writeFileSync("./json/qualplot.json", settings);
  return 0;
};

const stSeedSaver = async (stSeed: number) => {
  qualplot.start_seed = stSeed;
  const settings: string | ArrayBufferView = JSON.stringify(
    qualplot,
    undefined,
    4
  );
  fs.writeFileSync("./json/qualplot.json", settings);
};

const endSeedSaver = async (endSeed: number) => {
  qualplot.end_seed = endSeed;
  const settings: string | ArrayBufferView = JSON.stringify(
    qualplot,
    undefined,
    4
  );
  fs.writeFileSync("./json/qualplot.json", settings);
};

const maxNodeSaver = async (maxNode: number) => {
  qualplot.max_node = maxNode;
  const settings: string | ArrayBufferView = JSON.stringify(
    qualplot,
    undefined,
    4
  );
  fs.writeFileSync("./json/qualplot.json", settings);
};

const setQualnetExePath = async (path: string) => {
  qualplot.qualnet_path = path;
  const settings: string | ArrayBufferView = JSON.stringify(
    qualplot,
    undefined,
    4
  );
  fs.writeFileSync("./json/qualplot.json", settings);
};

const spawnp = () => {
  return new Promise((resolve) => {
    const pyExecute = ChildProcess.spawn("python", [
      "./electron/python/main.py",
    ]);
    pyExecute.stdout.setEncoding("utf8");
    pyExecute.stdout.on("data", (data) => {
      console.log(data);
    });
    pyExecute.on("close", (code) => {
      console.log("Success");
      resolve(0);
    });
  });
};

const pythonPipeLine = async () => {
  await spawnp();
  return 0;
};

const openSettingJson = () => {
  const jsonPath = path.resolve("./json/qualplot.json");
  shell.openExternal(jsonPath);
};

const closeApp = async () => {
  if (process.platform !== "darwin") app.quit();
  console.log("goodbye");
  return 0;
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", (event, identifier: string) =>
    handleFileOpen(identifier)
  );
  ipcMain.handle("dialog:openFolder", (event, identifier: string) =>
    handleFolderOpen(identifier)
  );
  ipcMain.handle("jsonshare", (event) => {
    return qualplot;
  });
  ipcMain.handle("pyexec", async (event) => pythonPipeLine());
  ipcMain.on("stseed", (event, startSeed: number) => stSeedSaver(startSeed));
  ipcMain.on("endseed", (event, endSeed: number) => endSeedSaver(endSeed));
  ipcMain.on("maxnode", (event, maxNode: number) => maxNodeSaver(maxNode));
  ipcMain.handle("dialog:openjson", (event) => openSettingJson());
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("ready", () => {
  ipcMain.handle("quitapp", (event) => closeApp);
});
