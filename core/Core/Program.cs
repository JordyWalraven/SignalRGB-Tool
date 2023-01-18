using ElectronCgi.DotNet;
using Newtonsoft.Json;


namespace Core;
class Program
{
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

    connection.Listen();
  }
}
