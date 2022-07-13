export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  openFile: () => Promise<string>;
  decideNum: () => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
