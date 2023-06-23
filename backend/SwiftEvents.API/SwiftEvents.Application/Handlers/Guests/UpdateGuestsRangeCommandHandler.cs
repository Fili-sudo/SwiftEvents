using MediatR;
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
    public class UpdateGuestsRangeCommandHandler : IRequestHandler<UpdateGuestsRangeCommand, List<Guest>>
    {
        private readonly AppDbContext _context;

        public UpdateGuestsRangeCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Guest>> Handle(UpdateGuestsRangeCommand command, CancellationToken cancellationToken)
        {
            _context.Guests.UpdateRange(command.Guests);
            await _context.SaveChangesAsync();
            return await Task.FromResult(command.Guests);
        }
    }
}
