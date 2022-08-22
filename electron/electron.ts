import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

import * as ChildProcess from "child_process";
import Store from "electron-store";

interface setting {
  save: string;
  scenario_file_path: string;
  start_seed: number;
  end_seed: number;
  max_node: number;
  qualnet_path: string;
  default_path: string;
}

const store = new Store<setting>({
  cwd: app.getPath("userData"),
  name: "config",
  fileExtension: "json",
  schema: {
    save: {
      type: "string",
    },
    scenario_file_path: {
      type: "string",
    },
    start_seed: {
      type: "number",
    },
    end_seed: {
      type: "number",
    },
    max_node: {
      type: "number",
    },
    qualnet_path: {
      type: "string",
    },
    default_path: {
      type: "string",
    },
  },
});

const getSettings = () => {
  const save = String(store.get("save"));
  const scena = String(store.get("scenario_file_path"));
  const stsd = Number(store.get("start_seed"));
  const endsd = Number(store.get("end_seed"));
  const mxnd = Number(store.get("max_node"));
  const qualp = String(store.get("qualnet_path"));
  const defp = String(store.get("default_path"));

  return {
    save: save,
    scenario_file_path: scena,
    start_seed: stsd,
    end_seed: endsd,
    max_node: mxnd,
    qualnet_path: qualp,
    default_path: defp,
  };
};

const createWindow = () => {
  store.set(
    "default_path",
    "..\\..\\..\\..\\..\\..\\qualnet\\7.4\\bin\\qualnet.exe"
  );
  //セキュリティ警告はおそらくtitleBarかframe周りなので大丈夫そう
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
  store.set("save", filePath);
  return filePath;
};

const setScenarioFile = async (filePath: string) => {
  store.set("scenario_file_path", filePath);
  return 0;
};

const stSeedSaver = async (stSeed: number) => {
  store.set("start_seed", stSeed);
};

const endSeedSaver = async (endSeed: number) => {
  store.set("end_seed", endSeed);
};

const maxNodeSaver = async (maxNode: number) => {
  store.set("max_node", maxNode);
};

const setQualnetExePath = async (path: string) => {
  store.set("qualnet_path", path);
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
/*
const openSettingJson = () => {
  const jsonPath = path.resolve("./json/qualplot.json");
  shell.openExternal(jsonPath);
};
*/
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
    const info = getSettings();
    return info;
  });
  ipcMain.handle("pyexec", async (event) => pythonPipeLine());
  ipcMain.on("stseed", (event, startSeed: number) => stSeedSaver(startSeed));
  ipcMain.on("endseed", (event, endSeed: number) => endSeedSaver(endSeed));
  ipcMain.on("maxnode", (event, maxNode: number) => maxNodeSaver(maxNode));
  //ipcMain.handle("dialog:openjson", (event) => openSettingJson());
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("ready", () => {
  ipcMain.handle("quitapp", (event) => closeApp);
});
