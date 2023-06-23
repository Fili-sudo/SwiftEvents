
using SwiftEvents.Domain.Models;

namespace SwiftEvents.Application.Responses
{
    public class PaginatedResponse<T>
    {
        public PaginatedResponse()
        {
        }

        public PaginatedResponse(List<T> data)
        {
            Data = data;
        }

        public PaginatedResponse(List<T> data, IPagedFilter filter, int totalRows) : this(data)
        {
            PageSize = filter.PageSize;
            PageNumber = filter.PageNumber;
            TotalRows = totalRows;
        }

        public List<T> Data { get; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
        public int TotalRows { get; set; }
    }
}
