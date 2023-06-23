using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Queries.Events;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Events
{
    public class GetEventsForUserQueryHandler : IRequestHandler<GetEventsForUserQuery, List<Event>>
    {
        private readonly AppDbContext _context;

        public GetEventsForUserQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Event>> Handle(GetEventsForUserQuery request, CancellationToken cancellationToken)
        {
            var result = await _context.Events
                .Where(x => x.UserId == request.UserId)
                .ToListAsync();
            return result;
        }
    }
}
