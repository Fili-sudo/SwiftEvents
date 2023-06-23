
namespace SwiftEvents.Domain.Models
{
    public class PaginationFilter :IPagedFilter
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRows { get; set; }
    }
}
