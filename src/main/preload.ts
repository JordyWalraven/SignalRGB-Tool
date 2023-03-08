/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const { ConnectionBuilder } = require('electron-cgi');
const fs = require('fs');

const connection = new ConnectionBuilder()
  .connectTo('./core/Core/bin/Release/net6.0-windows/win10-x64/Core.exe')
  .build();

connection.onDisconnect = () => {
  console.log('Lost connection to the .Net process');
  alert('Something went wrong when connecting to the .Net processes!');
  alert('Please restart the application!');
};

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    }
  }
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('apiConnection', connection);
contextBridge.exposeInMainWorld('fileReader', fs);
