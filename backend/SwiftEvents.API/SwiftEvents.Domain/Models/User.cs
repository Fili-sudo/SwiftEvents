using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Domain.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Mail { get; set; }
        public List<Event> Events { get; set; }
    }
}
