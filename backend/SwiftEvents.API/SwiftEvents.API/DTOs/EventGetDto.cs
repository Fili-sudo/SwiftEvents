using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.DTOs
{
    public class EventGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
    
    }
}
