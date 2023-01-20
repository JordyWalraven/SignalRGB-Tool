using System.Diagnostics;

namespace Core;

class FileManager
{
  public static string copyEffect(string inputPath)
  {
    string filePath = inputPath.Replace("\\", "/");
    string signalVersion = SignalVersionChecker.GetSignalPath();
    string[] splitPath = filePath.Split("/");
    string fileName = splitPath[splitPath.Length - 1];
    string newPath = signalVersion + "/Signal-x64/Effects/Dynamic/" + fileName;
    File.Copy(filePath, newPath, true);
    ProcessManager.relaunchSignalRGB();
    return "success";
  }

  public static string openDynamicFolder()
  {
    string signalVersion = SignalVersionChecker.GetSignalPath();
    var process = new ProcessStartInfo();
    process.UseShellExecute = true;
    process.WorkingDirectory = @"C:\Windows\System32";
    process.FileName = @"C:\Windows\System32\cmd.exe";
    process.Arguments = "/c " + $"start {signalVersion}/Signal-x64/Effects/Dynamic/";
    process.WindowStyle = ProcessWindowStyle.Hidden;
    try
    {
      Process.Start(process);
      return "success";
    }
    catch
    {
      return "error";
    }


  }
}
