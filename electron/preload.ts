import { contextBridge, ipcRenderer, ipcMain, IpcMainInvokeEvent, dialog } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  counter: (count: number) => {
    return count + 1;
  },
});

