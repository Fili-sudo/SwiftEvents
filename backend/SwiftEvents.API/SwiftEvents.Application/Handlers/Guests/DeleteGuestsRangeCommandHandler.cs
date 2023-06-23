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
    public class DeleteGuestsRangeCommandHandler : IRequestHandler<DeleteGuestsRangeCommand, List<Guest>>
    {
        private readonly AppDbContext _context;

        public DeleteGuestsRangeCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Guest>> Handle(DeleteGuestsRangeCommand command, CancellationToken cancellationToken)
        {
            var guestsToBeDeleted = await _context.Guests.Where(x => command.GuestIds.Any(s => s == x.Id)).ToListAsync();
            if (guestsToBeDeleted.Count > 0)
            {
                _context.Guests.RemoveRange(guestsToBeDeleted);
                await _context.SaveChangesAsync();
            }
            return await Task.FromResult(guestsToBeDeleted);
        }
    }
}
