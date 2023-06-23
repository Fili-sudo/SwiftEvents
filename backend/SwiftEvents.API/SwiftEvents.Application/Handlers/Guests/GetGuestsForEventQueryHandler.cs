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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace SwiftEvents.Application.Handlers.Guests
{
    public class GetGuestsForEventQueryHandler : IRequestHandler<GetGuestsForEventQuery, PaginatedResponse<Guest>>
    {
        private readonly AppDbContext _context;

        public GetGuestsForEventQueryHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<PaginatedResponse<Guest>> Handle(GetGuestsForEventQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Guests
                .AsNoTracking()
                .Include(x => x.Table)
                .Where(x => x.EventId == request.EventId)
            .AsQueryable();

            var count = await query.CountAsync(cancellationToken);

            var data = await query
           .Skip(PaginationHelper.GetPageNumber(request.Filter))
           .Take(request.Filter.PageSize)
           .ToListAsync(cancellationToken);

            return new PaginatedResponse<Guest>(data, request.Filter, count);
        }
    }
}
