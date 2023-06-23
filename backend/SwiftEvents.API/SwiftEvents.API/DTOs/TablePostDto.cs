namespace SwiftEvents.API.DTOs
{
    public class TablePostDto
    {
        public int TableNumber { get; set; }
        public int NoOfSeats { get; set; }
        public Guid EventId { get; set; }
    }
}
