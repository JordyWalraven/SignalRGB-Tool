using ElectronCgi.DotNet;
using Newtonsoft.Json;
using System.Runtime.InteropServices;


namespace Core;
class Program
{

  [DllImport("User32.dll")]
  private static extern short GetAsyncKeyState(System.Int32 vKey);

  static void Main(string[] args)
  {
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

    connection.Listen();
  }
}
