using SwiftEvents.Application.Requests.Tables;

namespace SwiftEvents.API.DTOs
{
    public class TableRangePostDto
    {
        public Guid EventId { get; set; }
        public CreateRangeOfTablesRequest Request { get; set; }
    }
}
