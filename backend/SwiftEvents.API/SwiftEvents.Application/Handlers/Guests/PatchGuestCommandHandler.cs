using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Commands.Guests;
using SwiftEvents.Data_Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Guests
{
    public class PatchGuestCommandHandler : IRequestHandler<PatchGuestCommand, bool>
    {
        private readonly AppDbContext _context;

        public PatchGuestCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(PatchGuestCommand command, CancellationToken cancellationToken)
        {
            var guest = await _context.Guests.
                FirstOrDefaultAsync(x => x.Id == command.GuestId);

            if (guest == null) return false;
            guest.Name = command.Name;
            guest.PhoneNumber = command.PhoneNumber;
            return await _context.SaveChangesAsync() > 0;

        }
    }
}
