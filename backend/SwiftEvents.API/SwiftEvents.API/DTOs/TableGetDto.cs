using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.DTOs
{
    public class TableGetDto
    {
        public Guid Id { get; set; }
        public int TableNumber { get; set; }
        public int NoOfSeats { get; set; }
        public Guid EventId { get; set; }
        public List<GuestGetForTable> Guests { get; set; }  //works with GuestGetDto. if something breaks fallback to GuestGetDto
    }
}
