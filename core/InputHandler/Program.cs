using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;
using System.Threading;
using ElectronCgi.DotNet;

namespace ConsoleApp1
{
  class Program
  {


    [DllImport("User32.dll")]
    private static extern short GetAsyncKeyState(System.Int32 vKey);
    static void Main(string[] args)
    {
      var connection = new ConnectionBuilder().WithLogging().Build();


    }
  }
}
