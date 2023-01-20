import {
  ElectronHandler,
  FileHandler,
  InputHandler,
  ActionHandler,
} from 'main/preload';

declare global {
  interface Window {
    electron: ElectronHandler;
    fileHander: FileHandler;
    inputHandler: InputHandler;
    actionHandler: ActionHandler;
  }
}

export {};
