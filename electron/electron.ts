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
import * as ChildProcess from "child_process";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
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

const handleFileOpen = async (identifier: string) => {
  const { canceled, filePaths } = await dialog.showOpenDialog(null);
  if (canceled) return 0;
  else {
    if (identifier === "scenarioPath") setScenarioFile(filePaths[0]);
    if (identifier === "qualpath")  setQualnetExePath(filePaths[0]);

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

const setQualnetExePath = async (path : string) => {
  qualplot.qualnet_path = path;
  const settings : string | ArrayBufferView = JSON.stringify(
    qualplot,
    undefined,
    4
  )
  fs.writeFileSync("./json/qualplot.json", settings);
}

const pythonPipeLine = async () => {
  ChildProcess.exec("python3 ./src/python/main.py",
  (error : ChildProcess.ExecException | null, stdout: string, stderr: string) =>{
      if(error){
          console.error("stderr", stderr);
          throw error;
      }
      console.log(stdout)
      if(stdout === "Done"){
          return 0;
      }
  });
}

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
  })
  ipcMain.handle("pyexec", (event) => pythonPipeLine());
  ipcMain.on("stseed", (event, startSeed: number) => stSeedSaver(startSeed));
  ipcMain.on("endseed", (event, endSeed: number) => endSeedSaver(endSeed));
  ipcMain.on("maxnode", (event, maxNode: number) => maxNodeSaver(maxNode));
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
