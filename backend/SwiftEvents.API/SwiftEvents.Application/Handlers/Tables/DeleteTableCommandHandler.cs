using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Commands.Tables;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Tables
{
    public class DeleteTableCommandHandler : IRequestHandler<DeleteTableCommand, Table>
    {
        private readonly AppDbContext _context;

        public DeleteTableCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Table> Handle(DeleteTableCommand command, CancellationToken cancellationToken)
        {
            var tableToBeDeleted = await _context.Tables
                .Include(x => x.Guests)
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            if (tableToBeDeleted == null)
            {
                return null;
            }

            _context.Tables.Remove(tableToBeDeleted);
            await _context.SaveChangesAsync();
            return tableToBeDeleted;
        }
    }
}
