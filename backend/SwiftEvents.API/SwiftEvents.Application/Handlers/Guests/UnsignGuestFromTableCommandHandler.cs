using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Commands.Guests;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Guests
{
    public class UnsignGuestFromTableCommandHandler : IRequestHandler<UnsignGuestFromTableCommand, Guest>
    {
        private readonly AppDbContext _context;

        public UnsignGuestFromTableCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Guest> Handle(UnsignGuestFromTableCommand command, CancellationToken cancellationToken)
        {
            var guestToBeUnsigned = await _context.Guests
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            if (guestToBeUnsigned == null)
            {
                return null;
            }
            guestToBeUnsigned.TableId = null;
            await _context.SaveChangesAsync();

            return guestToBeUnsigned;
        }
    }
}
