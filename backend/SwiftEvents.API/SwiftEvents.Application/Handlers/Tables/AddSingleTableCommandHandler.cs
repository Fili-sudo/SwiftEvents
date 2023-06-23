using MediatR;
using SwiftEvents.Application.Commands.Tables;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Tables
{
    public class AddSingleTableCommandHandler : IRequestHandler<AddSingleTableCommand, Table>
    {
        private readonly AppDbContext _context;

        public AddSingleTableCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Table> Handle(AddSingleTableCommand command, CancellationToken cancellationToken)
        {
            await _context.Tables.AddAsync(command.Table);
            await _context.SaveChangesAsync();

            return await Task.FromResult(command.Table);
        }
    }
}
