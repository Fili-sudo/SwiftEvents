namespace SwiftEvents.API.Helpers
{
    public static class PaginationHelper
    {
        public const int MaxPageSize = 100;
        public const int DefaultPageSize = 10;
        public const int DefaultPageNumber = 0;
        public const int MinimumPageSize = 1;
        public static int CheckMaxPageSize(int pageSize)
        {
            if (pageSize < MinimumPageSize)
                return DefaultPageSize;
            return pageSize > MaxPageSize ? MaxPageSize : pageSize;
        }

        public static int CheckDefaultPageNumber(int pageNumber)
        {
            return (pageNumber < DefaultPageNumber) ? DefaultPageNumber : pageNumber;
        }
    }
}
