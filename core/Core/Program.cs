using ElectronCgi.DotNet;
using Newtonsoft.Json;
using System.Runtime.InteropServices;
using System.Diagnostics;


namespace Core;
class Program
{

  static void Main(string[] args)
  {
    var connection = new ConnectionBuilder().WithLogging().Build();

    connection.On<string>("getCursor", () => { return InputManager.getMousePos(); });

    connection.On<string>("getKeyDown", () => { return InputManager.getKeyDown(); });

    connection.On<string>("getLocalAppdataPath", () => { return Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData); });

    connection.On<string>("openVsCode", () => { return ProcessManager.openVsCode(); });

    connection.On<string>("relaunchSignalRGB", () => { return ProcessManager.relaunchSignalRGB(); });

    connection.On<string, string>("copyEffect", (filePath) => { return FileManager.copyEffect(filePath); });

    connection.On<string>("openDynamicFolder", () => { return FileManager.openDynamicFolder(); });



    connection.Listen();
  }
}
