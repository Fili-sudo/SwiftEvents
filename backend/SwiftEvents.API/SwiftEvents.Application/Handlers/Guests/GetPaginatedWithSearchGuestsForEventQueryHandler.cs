using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Helpers;
using SwiftEvents.Application.Queries.Guests;
using SwiftEvents.Application.Responses;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Guests
{
    public class GetPaginatedWithSearchGuestsForEventQueryHandler : IRequestHandler<GetPaginatedWithSearchGuestsForEventQuery, PaginatedResponse<Guest>>
    {
        private readonly AppDbContext _context;

        public GetPaginatedWithSearchGuestsForEventQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PaginatedResponse<Guest>> Handle(GetPaginatedWithSearchGuestsForEventQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Guests
                .AsNoTracking()
                .Include(x => x.Table)
                .Where(x => x.EventId == request.EventId)
            .AsQueryable();

            var filter = request.Filter;

            query = QueryBuilder(query, filter);

            var count = await query.CountAsync(cancellationToken);

            var data = await query
           .Skip(PaginationHelper.GetPageNumber(request.Filter))
           .Take(request.Filter.PageSize)
           .ToListAsync(cancellationToken);

            return new PaginatedResponse<Guest>(data, request.Filter, count);
        }

        private static IQueryable<Guest> QueryBuilder(IQueryable<Guest> query, PaginationSearchFilter filter)
        {
            

            if (filter.Search == null) return query;
            var searchCriterias = filter.Search.Split(" ");

            foreach (var word in searchCriterias)
                query = query.Where(x => x.Name.ToLower().Contains(word));
            return query;
        }
    }
}
