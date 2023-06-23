using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Responses
{
    public class SparsedTablesResponse
    {
        public SparsedTablesResponse(ArrayList tableNumbers)
        {
            TableNumbers = tableNumbers;
        }

        public ArrayList TableNumbers { get; set; } = new ArrayList();
    }
}
