import {
  contextBridge,
  ipcRenderer,
  ipcMain,
  IpcMainInvokeEvent,
  dialog,
} from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  decideNum: () => ipcRenderer.invoke("get:decideNum"),
});
