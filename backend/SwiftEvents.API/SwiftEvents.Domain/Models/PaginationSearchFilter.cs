using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Domain.Models
{
    public class PaginationSearchFilter : IPagedFilter
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRows { get; set; }
        public string Search { get; set; }
    }
}
