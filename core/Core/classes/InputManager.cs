using System.Runtime.InteropServices;
using Newtonsoft.Json;

namespace Core;

class InputManager
{

  [DllImport("User32.dll")]
  private static extern short GetAsyncKeyState(System.Int32 vKey);
  public static string getKeyDown()
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
  }

  [System.Runtime.InteropServices.DllImport("user32.dll")]
  private static extern bool SetProcessDPIAware();
  public static string getMousePos()
  {
    SetProcessDPIAware();
    Point point = Control.MousePosition;
    Color mousecolor = MouseService.GetPixelColor(point.X, point.Y);
    float[] rgb = new float[3];
    rgb[0] = mousecolor.R;
    rgb[1] = mousecolor.G;
    rgb[2] = mousecolor.B;
    MouseModel mouse = new MouseModel(point.X, point.Y, rgb);

    string JSONResult = JsonConvert.SerializeObject(mouse);
    return JSONResult;
  }
}
