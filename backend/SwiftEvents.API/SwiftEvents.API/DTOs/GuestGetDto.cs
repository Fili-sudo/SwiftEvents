using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.DTOs
{
    public class GuestGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public Guid EventId { get; set; }
        public Guid? TableId { get; set; }
        public TableGetForGuestDto Table { get; set; }
    }
}
