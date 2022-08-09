export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  openFile: (identifier: string) => Promise<string>;
  openFolder: (identifier: string) => Promise<string>;
  jsonShare: () => Promise<any>;
  pyExec: () => Promise<any>;
  quitApp: () => Promise<void>;
  stSeed: (value: number) => Promise<any>;
  endSeed: (value: number) => Promise<any>;
  maxNode: (value: number) => Promise<any>;
  //openSettingJson: () => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
