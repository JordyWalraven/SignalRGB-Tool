using System.Diagnostics;

namespace Core;

class ProcessManager
{
  public static string openVsCode()
  {
    string path = SignalVersionChecker.GetSignalPath();
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

  }

  public static string relaunchSignalRGB()
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
  }
}
