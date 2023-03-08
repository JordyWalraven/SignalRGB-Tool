using System.Diagnostics;
using System.Management;

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
    try
    {
      Process proc = new Process();
      proc.StartInfo.FileName = "cmd.exe";
      proc.StartInfo.Arguments = "/c start signalrgb://app/restart";
      proc.StartInfo.CreateNoWindow = true;
      proc.StartInfo.UseShellExecute = false;
      proc.Start();
      return "success";
    }
    catch
    {
      return "error";
    }


  }
}
