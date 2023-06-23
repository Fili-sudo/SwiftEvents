using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Exceptions
{
    public class FileException : Exception
    {
        public FileException()
        {
        }

        public FileException(string? message) : base(message)
        {
        }

        public FileException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
