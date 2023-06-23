using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Domain.Models
{
    public class Table
    {
        public Guid Id { get; set; }
        public int TableNumber { get; set; }
        public int NoOfSeats { get; set; }
        public Guid EventId { get; set; }
        public Event Event { get; set; }
        public List<Guest> Guests { get; set; }
    }
}
