namespace SwiftEvents.API.DTOs
{
    public class TableWithSummaryGuestsGetDto
    {
        public Guid Id { get; set; }
        public int TableNumber { get; set; }
        public int NoOfSeats { get; set; }
        public List<GuestSummaryGetDto> Guests { get; set; }
    }
}
