using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Domain.Models
{
    public class UploadedFile
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public DateTime DateCreated { get; set; }
        public string AbsoluteUri { get; set; }
        public Guid EventId { get; set; }
        public Event Event { get; set; }
    }
}
