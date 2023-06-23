using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Domain.Models
{
    public class Guest
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Guid EventId { get; set; }
        public Event Event { get; set; }
        public Guid? TableId { get; set; }
        public Table? Table { get; set; }
    }
}
