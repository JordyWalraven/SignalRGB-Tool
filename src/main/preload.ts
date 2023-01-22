/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
import { contextBridge, ipcRenderer, IpcRendererEvent,  } from 'electron';

const {ConnectionBuilder } = require("electron-cgi")
const fs = require('fs');

const connection = new ConnectionBuilder().connectTo("./core/Core/bin/Release/net6.0-windows/win10-x64/Core.exe").build();



connection.onDisconnect = () => {
  console.log('Lost connection to the .Net process');
  alert("Something went wrong when connecting to the .Net processes!")
  alert("Please restart the application!");
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
};

const  fileHandler = {
  getDynamicPath: (localPath:string) => {
    const paths = fs.readdirSync(localPath+"/VortxEngine/")
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
    const returnpath = localPath+"/VortxEngine/app-"+newestVersion[0]+"."+newestVersion[1]+"."+newestVersion[2]+"/Signal-x64/Effects/Dynamic/"
    console.log(returnpath)
    return returnpath;
},
getLocalPath:()=>{
  let response =connection.send("getLocalAppdataPath");
  return response;
}
,
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
}

const inputHandler = {
  getCursorPosition:() => {
    let response = connection.send("getCursor");
     return response;
 },
 getKeyDown:()=>{
   let response = connection.send("getKeyDown")
   return response;
 },
}

const actionHandler = {
  openVSCode:()=>{
    let response = connection.send("openVsCode")
    return response;
  },
  relaunchSignalRGB:()=>{
    let response = connection.send("relaunchSignalRGB")
    return response;
  },
  copyEffect:(filePath:string)=>{
    let response = connection.send("copyEffect",filePath)
    return response;
  },
  openDynamicFolder:()=>{
    let response = connection.send("openDynamicFolder")
    return response;
  }
}





contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld("fileHandler",fileHandler);
contextBridge.exposeInMainWorld("inputHandler",inputHandler)
contextBridge.exposeInMainWorld("actionHandler",actionHandler)

export type ElectronHandler = typeof electronHandler;
export type FileHandler = typeof fileHandler
export type InputHandler = typeof inputHandler
export type ActionHandler = typeof actionHandler
