using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Extensions
{
    public static class Base64Extenstion
    {
       public static string ExtractBase64(this string base64) =>
        Regex.Match(base64, @"data:([^;]+);base64,(.+)").Groups[2].Value;
       public static byte[] GetBytes(this string base64) =>
        Convert.FromBase64String(base64);

    }
}
