using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Commands.Events;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Events
{
    public class DeleteEventByIdCommandHandler : IRequestHandler<DeleteEventByIdCommand, Event>
    {
        private readonly AppDbContext _context;

        public DeleteEventByIdCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Event> Handle(DeleteEventByIdCommand command, CancellationToken cancellationToken)
        {
            var eventToBeDeleted = await _context.Events
                .FirstOrDefaultAsync(x => x.Id == command.EventId);
            if(eventToBeDeleted != null)
            {
                _context.Events.Remove(eventToBeDeleted);
                await _context.SaveChangesAsync();
            }
            return await Task.FromResult(eventToBeDeleted);
        }
    }
}
