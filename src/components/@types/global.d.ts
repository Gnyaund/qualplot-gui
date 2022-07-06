export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
  openFile: () => Promise<string>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}