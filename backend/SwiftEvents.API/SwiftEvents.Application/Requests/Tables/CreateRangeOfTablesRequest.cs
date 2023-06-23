using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Requests.Tables
{
    public class CreateRangeOfTablesRequest
    {
        public CreateRangeOfTablesRequest()
        {
            SparsedTables = new int[1];
            NoOfSeats = 10;
        }

        public CreateRangeOfTablesRequest(int[] sparsedTables)
        {
            SparsedTables = sparsedTables;
            NoOfSeats = 10;
        }

        public CreateRangeOfTablesRequest(int noOfSeats, int[] sparsedTables)
        {
            NoOfSeats = noOfSeats;
            SparsedTables = sparsedTables;
        }

        public int NoOfSeats { get; set; }
        public int[] SparsedTables { get; set; }
    }
}
