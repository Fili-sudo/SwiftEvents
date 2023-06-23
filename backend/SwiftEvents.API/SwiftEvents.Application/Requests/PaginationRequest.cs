
namespace SwiftEvents.Application.Requests
{
    public class PaginationRequest
    {
        private const int MaxPageSize = 100;
        public PaginationRequest(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber < 0 ? 0 : pageNumber;
            PageSize = pageSize > MaxPageSize ? MaxPageSize : pageSize;
        }
        public PaginationRequest()
        {
            PageNumber = 0;
            PageSize = 5;
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
