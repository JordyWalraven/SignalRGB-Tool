using System.Diagnostics;
using System.Drawing.Imaging;
using System.Net;

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

  public static string[] getGifImages(string url)
  {

    List<string> IMGs = new List<string>();

    var request = WebRequest.Create(url);

    using (var response = request.GetResponse())
    using (var stream = response.GetResponseStream())
    {
      Image gif = Bitmap.FromStream(stream);

      int numberOfFrames = gif.GetFrameCount(FrameDimension.Time);
      Image[] frames = new Image[numberOfFrames];

for (int i = 0; i < numberOfFrames; i++)
      {
        gif.SelectActiveFrame(FrameDimension.Time, i);
        frames[i] = ((Image)gif.Clone());

        using (MemoryStream m = new MemoryStream())
        {
          frames[i].Save(m, ImageFormat.Png);
          byte[] imageBytes = m.ToArray();

          // Convert byte[] to Base64 String
          string base64String = Convert.ToBase64String(imageBytes);
          IMGs.Add(base64String);
        }

      }
      return IMGs.ToArray();
    }

  }
}
