using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Commands.Tables;
using SwiftEvents.Application.Requests.Tables;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Tables
{
    public class AddRecommendedRangeTablesCommandHandler : IRequestHandler<AddRecommendedRangeTablesCommand, List<Table>>
    {
        private readonly AppDbContext _context;

        public AddRecommendedRangeTablesCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Table>> Handle(AddRecommendedRangeTablesCommand command, CancellationToken cancellationToken)
        {
            var potentialNrOfGuests = await _context.Tables
                .Where(x => x.EventId == command.EventId)
                .SumAsync(x => x.NoOfSeats);

            var totalGuests = await _context.Guests
                .Where(x => x.EventId == command.EventId)
                .CountAsync();

            var remainingGuests = totalGuests - potentialNrOfGuests;
            var tablesToCreate = (int)Math.Ceiling(1.0 * remainingGuests / command.CreateRange.NoOfSeats);
            var tables = new List<Table>();

            if (tablesToCreate > 0)
            {
                tables = CreateRemainingTables(tablesToCreate, command.EventId, command.CreateRange);
                _context.Tables.AddRange(tables);
                await _context.SaveChangesAsync();
            }
            return tables;
        }

        private List<Table> CreateRemainingTables(int tablesToCreate, Guid eventId, CreateRangeOfTablesRequest createRange)
        {
            var tables = new List<Table>();
            var length = createRange.SparsedTables.Length;
            var tableNumber = 0;

            for (int i = 0; i < tablesToCreate; i++)
            {
                tableNumber = i + 1 > length ? tableNumber += 1 : createRange.SparsedTables[i];
                tables.Add(new()
                {
                    EventId = eventId,
                    NoOfSeats = createRange.NoOfSeats,
                    TableNumber = tableNumber
                });
            }
            return tables;
        }
    }
}
