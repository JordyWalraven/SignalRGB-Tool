using ElectronCgi.DotNet;
using Newtonsoft.Json;
using System.Runtime.InteropServices;
using System.Diagnostics;


namespace Core;
class Program
{

  [DllImport("User32.dll")]
  private static extern short GetAsyncKeyState(System.Int32 vKey);



  static void Main(string[] args)
  {
    SignalVersionChecker signalVersionChecker = new SignalVersionChecker();
    var connection = new ConnectionBuilder().WithLogging().Build();

    connection.On<string>("getCursor", () =>
      {
        Point point = Cursor.Position;
        Color mousecolor = MouseService.GetPixelColor(point.X, point.Y);
        float[] rgb = new float[3];
        rgb[0] = mousecolor.R;
        rgb[1] = mousecolor.G;
        rgb[2] = mousecolor.B;
        MouseModel mouse = new MouseModel(point.X, point.Y, rgb);

        string JSONResult = JsonConvert.SerializeObject(mouse);
        return JSONResult;
      });

    connection.On<string>("getKeyDown", () =>
    {
      if (GetAsyncKeyState(16) != 0)
      {
        return "shift";
      }
      else if (GetAsyncKeyState(17) != 0)
      {
        return "control";
      }
      return "none";
    });

    connection.On<string>("getLocalAppdataPath", () =>
    {
      return Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
    });

    connection.On<string>("openVsCode", () =>
    {
      string path = signalVersionChecker.GetSignalPath();
      Process launchHtml = new Process();
      launchHtml.StartInfo.UseShellExecute = true;
      launchHtml.StartInfo.FileName = "code";
      launchHtml.StartInfo.Arguments = path + "/Signal-x64/Effects/Dynamic/";
      launchHtml.StartInfo.CreateNoWindow = false;

      try
      {
        launchHtml.Start();
        return "success";
      }
      catch
      {
        return "error";
      }
    });

    connection.On<string>("relaunchSignalRGB", () =>
    {

      var SignalProcess = Process.GetProcessesByName("SignalRGB")[0];

      if (SignalProcess.MainModule != null)
      {
        var signalpath = SignalProcess.MainModule.FileName;
        SignalProcess.Kill();
        if (signalpath == null)
        {
          return "error";
        }
        Process.Start(signalpath).Start();
        return "success";
      }
      else
      {
        return "error";
      }
    });

    connection.On<string, string>("copyEffect", (filePath) =>
    {
      return filePath;
    });

    connection.Listen();
  }
}
