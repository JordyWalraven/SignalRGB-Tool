namespace Core;

class MouseModel
{
  public MouseModel(int x, int y, float[] rgb)
  {
    X = x;
    Y = y;
    RGB = rgb;
  }

  public int X { get; set; }
  public int Y { get; set; }
  public float[] RGB { get; set; }


}
