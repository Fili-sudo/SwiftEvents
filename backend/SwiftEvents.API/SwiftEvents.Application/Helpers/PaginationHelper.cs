

using SwiftEvents.Domain.Models;

namespace SwiftEvents.Application.Helpers
{
    public class PaginationHelper
    {
        public static int GetPageNumber(IPagedFilter filter)
        {
            return Calculate(filter.PageSize, filter.PageNumber);
        }

        private static int Calculate(int pageSize, int pageNumber)
        {
            return pageNumber * pageSize;
        }
    }
}
