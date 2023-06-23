namespace SwiftEvents.API.DTOs
{
    public class TableGetForGuestDto
    {
        public Guid Id { get; set; }
        public int TableNumber { get; set; }
        public int NoOfSeats { get; set; }
    }
}
