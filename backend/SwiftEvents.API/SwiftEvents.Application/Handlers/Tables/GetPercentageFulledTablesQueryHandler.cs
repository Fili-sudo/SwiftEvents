using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Queries.Tables;
using SwiftEvents.Application.Responses;
using SwiftEvents.Data_Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Tables
{
    public class GetPercentageFulledTablesQueryHandler : IRequestHandler<GetPercentageFulledTablesQuery, PercentageFractionResponse>
    {
        private readonly AppDbContext _context;

        public GetPercentageFulledTablesQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PercentageFractionResponse> Handle(GetPercentageFulledTablesQuery request, CancellationToken cancellationToken)
        {
            //var occupiedSeats = await _context.Guests
            //    .Where(x => x.EventId == request.EventId && x.TableId != null)
            //    .CountAsync();

            var occupiedSeats = (
                    from table in _context.Tables.Where(x => x.EventId == request.EventId)
                    join guest in _context.Guests.Where(x => x.EventId == request.EventId)
                    on table.Id equals guest.TableId
                    select guest
                ).Count();

            var totalGuests = await _context.Guests
                .Where(x => x.EventId == request.EventId)
                .CountAsync();

            return new PercentageFractionResponse(occupiedSeats, totalGuests);
        }
    }
}
