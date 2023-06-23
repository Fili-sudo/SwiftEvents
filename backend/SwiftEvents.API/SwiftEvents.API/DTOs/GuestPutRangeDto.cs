using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.DTOs
{
    public class GuestPutRangeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Guid EventId { get; set; }
        public Guid? TableId { get; set; }

    }
}
