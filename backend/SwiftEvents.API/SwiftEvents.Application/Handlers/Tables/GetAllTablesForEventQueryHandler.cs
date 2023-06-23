using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Queries.Tables;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Tables
{
    public class GetAllTablesForEventQueryHandler : IRequestHandler<GetAllTablesForEventQuery, List<Table>>
    {
        private readonly AppDbContext _context;

        public GetAllTablesForEventQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Table>> Handle(GetAllTablesForEventQuery request, CancellationToken cancellationToken)
        {
            var tables = await _context.Tables
                .AsNoTracking()
                .Include(x => x.Guests)
                .Where(x => x.EventId == request.EventId)
                .OrderBy(x => x.TableNumber)
                .ToListAsync();

            return tables;
        }
    }
}
