import {
  contextBridge,
  ipcRenderer,
  ipcMain,
  IpcMainInvokeEvent,
  dialog,
} from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: (identifier: string) =>
    ipcRenderer.invoke("dialog:openFile", identifier),
  openFolder: (identifier: string) =>
    ipcRenderer.invoke("dialog:openFolder", identifier),
  stSeed: (startSeed: number) => ipcRenderer.send("stseed", startSeed),
  endSeed: (endSeed: number) => ipcRenderer.send("endseed", endSeed),
  maxNode: (maxNode: number) => ipcRenderer.send("maxnode", maxNode),
});
