using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Commands.Guests;
using SwiftEvents.Data_Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Guests
{
    public class PatchGuestTableCommandHandler : IRequestHandler<PatchGuestTableCommand, bool>
    {
        private readonly AppDbContext _context;

        public PatchGuestTableCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(PatchGuestTableCommand command, CancellationToken cancellationToken)
        {
            var guest = await _context.Guests.
                FirstOrDefaultAsync(x => x.Id == command.GuestId);
            var table = await _context.Tables.
                FirstOrDefaultAsync(x => x.Id == command.TableId);

            if (guest == null || table == null) return false;

            guest.TableId = command.TableId;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
