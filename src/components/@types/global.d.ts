export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  openFile: () => Promise<string>;
  stSeed: (value : number) => Promise<any>;
  endSeed: (value : number) => Promise<any>;
  maxNode: (value : number) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
