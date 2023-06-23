using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Requests
{
    public class PaginationSearchRequest
    {
        private const int MaxPageSize = 100;
        public PaginationSearchRequest(int pageNumber, int pageSize, string search)
        {
            PageNumber = pageNumber < 0 ? 0 : pageNumber;
            PageSize = pageSize > MaxPageSize ? MaxPageSize : pageSize;
            Search = search;
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string? Search { get; set; }
        

        public PaginationSearchRequest()
        {
            PageNumber = 0;
            PageSize = 5;
            Search ??= string.Empty;
        }
    }
}
