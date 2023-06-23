using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Queries.Guests;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Guests
{
    public class GetGuestByIdQueryHandler : IRequestHandler<GetGuestByIdQuery, Guest>
    {
        private readonly AppDbContext _context;

        public GetGuestByIdQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Guest> Handle(GetGuestByIdQuery request, CancellationToken cancellationToken)
        {
            var guest = await _context.Guests
                .Include(x => x.Table)
                .FirstOrDefaultAsync(x => x.Id == request.GuestId);

            return guest;
        }
    }
}
