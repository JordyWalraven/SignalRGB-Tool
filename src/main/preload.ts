/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
import { contextBridge, ipcRenderer, IpcRendererEvent,  } from 'electron';

const {ConnectionBuilder } = require("electron-cgi")
const fs = require('fs');

const connection = new ConnectionBuilder().connectTo("dotnet","run","--project","./core/Core").build();




connection.onDisconnect = () => {
  console.log('Lost connection to the .Net process');
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
    },
  },
  fileHander : {
    getDynamicPath: () => {
      const paths = fs.readdirSync("C:/Users/jordy/AppData/Local/VortxEngine/")
      console.log(paths)
      let newestVersion = ["0","0","0"];
      paths.forEach((path: string) => {

        const temp = path.split("app-")[1];
        if(temp !== undefined){
          const temp2 = temp.split(".");
        if(parseInt(temp2[0])>parseInt(newestVersion[0])){
          newestVersion = temp2;
        } else if (parseInt(temp2[0])===parseInt(newestVersion[0])){
          if(parseInt(temp2[1])>parseInt(newestVersion[1])){
            newestVersion = temp2;
          } else if (parseInt(temp2[1])===parseInt(newestVersion[1])){
            if(temp2[2]>newestVersion[2]){
              newestVersion = temp2;
            }
          }
        }
      }});
      console.log(newestVersion)
      const returnpath = "C:/Users/jordy/AppData/Local/VortxEngine/app-"+newestVersion[0]+"."+newestVersion[1]+"."+newestVersion[2]+"/Signal-x64/Effects/Dynamic/"
      console.log(returnpath)
      return returnpath;
  },
  async getHtmlFiles(dynamicFolder:string){;
    let fileNames =fs.readdirSync(dynamicFolder)

    let htmlFiles:any[] = [];
    fileNames.forEach(async (element:string) => {
      if (element.includes(".html")) {
        let dataString = await fs.readFileSync(dynamicFolder+element, "utf8")
        if (dataString === ""){
          return;
        }
        let tempName = dataString.split("<title>")[1].split("</title>")[0]

        let data ={
          name:tempName,
          html: dataString,
          path: dynamicFolder+element
        }
        htmlFiles.push(data)
      }
    });
    return htmlFiles;
  },
  getCursorPosition:() => {
     let response = connection.send("getCursor");
      return response;
  }
}
};


contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
