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
    public class AddGuestsForEventRangeCommandHandler : IRequestHandler<AddGuestsForEventRangeCommand, List<Guest>>
    {
        private readonly AppDbContext _context;

        public AddGuestsForEventRangeCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Guest>> Handle(AddGuestsForEventRangeCommand command, CancellationToken cancellationToken)
        {
            await _context.Guests.AddRangeAsync(command.GuestsList);
            await _context.SaveChangesAsync();

            return await Task.FromResult(command.GuestsList);

        }
    }
}
