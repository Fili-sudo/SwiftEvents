using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Responses
{
    public class PercentageFractionResponse
    {
        public PercentageFractionResponse(int x, int outOfY)
        {
            X = x;
            OutOfY = outOfY;
        }

        public int X { get; set; }
        public int OutOfY { get; set; }
    }
}
