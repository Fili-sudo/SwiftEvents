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
    public class GetEventByIdQueryHandler : IRequestHandler<GetEventByIdQuery, Event>
    {
        private readonly AppDbContext _context;

        public GetEventByIdQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Event> Handle(GetEventByIdQuery request, CancellationToken cancellationToken)
        {
            var @event = await _context.Events.FirstOrDefaultAsync(x => x.Id == request.Id);
            return @event;
        }
    }
}
