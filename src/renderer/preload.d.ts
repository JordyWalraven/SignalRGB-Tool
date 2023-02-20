import {
  ElectronHandler,
  FileHandler,
  InputHandler,
  ActionHandler,
  HtmlHandler,
} from 'main/preload';

declare global {
  interface Window {
    electron: ElectronHandler;
    fileHander: FileHandler;
    inputHandler: InputHandler;
    actionHandler: ActionHandler;
    htmlHandler: HtmlHandler;
  }
}

export {};
