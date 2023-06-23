namespace SwiftEvents.API.DTOs
{
    public class GuestDetailedGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public Guid EventId { get; set; }
        public Guid? TableId { get; set; }
        public TableWithSummaryGuestsGetDto Table { get; set; }
    }
}
