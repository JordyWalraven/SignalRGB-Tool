using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class SignalVersionChecker
    {

        public static string GetSignalPath()
        {
            string signalVersion = "";
            string appDataPath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string[] AvailableSignalVersion = Directory.GetDirectories($@"{appDataPath}/VortxEngine");
            int first = 0;
            int second = 0;
            int third = 0;



            foreach (var item in AvailableSignalVersion)
            {

                if (item.Contains("app"))
                {
                    string[] version = item.Split("app-");
                    string[] signalVersionString = version[1].Split('.');
                    if (Int32.Parse(signalVersionString[0]) > first)
                    {
                        first = Int32.Parse(signalVersionString[0]);
                        second = Int32.Parse(signalVersionString[1]);
                        third = Int32.Parse(signalVersionString[2]);
                        signalVersion = item;
                    }
                    else if (Int32.Parse(signalVersionString[0]) == first)
                    {
                        if (Int32.Parse(signalVersionString[1]) > second)
                        {
                            first = Int32.Parse(signalVersionString[0]);
                            second = Int32.Parse(signalVersionString[1]);
                            third = Int32.Parse(signalVersionString[2]);
                            signalVersion = item;
                        }
                        else if (Int32.Parse(signalVersionString[1]) == second)
                        {
                            if (Int32.Parse(signalVersionString[2]) > third)
                            {

                                first = Int32.Parse(signalVersionString[0]);
                                second = Int32.Parse(signalVersionString[1]);
                                third = Int32.Parse(signalVersionString[2]);
                                signalVersion = item;
                            }
                        }
                    }
                }

            }
            return signalVersion;
        }

    }
}
