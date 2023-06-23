namespace SwiftEvents.API.DTOs
{
    public class GuestPostRangeDto
    {
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Guid? TableId { get; set; }

    }
}
