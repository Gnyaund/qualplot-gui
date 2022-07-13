import {
  contextBridge,
  ipcRenderer,
  ipcMain,
  IpcMainInvokeEvent,
  dialog,
} from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  stSeed: (startSeed : number) => ipcRenderer.send("stseed", startSeed),
  endSeed: (endSeed : number) => ipcRenderer.send("endseed", endSeed),
  maxNode: (maxNode : number) => ipcRenderer.send("maxnode", maxNode),
});


