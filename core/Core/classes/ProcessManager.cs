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
    var SignalProcess = Process.GetProcessesByName("SignalRGB")[0];

    if (SignalProcess.MainModule != null)
    {
      var signalpath = SignalProcess.MainModule.FileName;
      SignalProcess.Kill();
      if (signalpath == null)
      {
        return "error";
      }

      using (var managementClass = new ManagementClass("Win32_Process"))
      {
        var processInfo = new ManagementClass("Win32_ProcessStartup");
        processInfo.Properties["CreateFlags"].Value = 0x00000008;

        var inParameters = managementClass.GetMethodParameters("Create");
        inParameters["CommandLine"] = signalpath;
        inParameters["ProcessStartupInformation"] = processInfo;

        var result = managementClass.InvokeMethod("Create", inParameters, null);
        if ((result != null) && ((uint)result.Properties["ReturnValue"].Value != 0))
        {
          Console.WriteLine("Process ID: {0}", result.Properties["ProcessId"].Value);
        }
      }

      return "success";
    }
    else
    {
      return "error";
    }
  }
}
