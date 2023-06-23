using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Queries.Tables;
using SwiftEvents.Application.Responses;
using SwiftEvents.Data_Access;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Tables
{
    public class GetSparsedTablesForEventQueryHandler : IRequestHandler<GetSparsedTablesForEventQuery, SparsedTablesResponse>
    {
        private readonly AppDbContext _context;

        public GetSparsedTablesForEventQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<SparsedTablesResponse> Handle(GetSparsedTablesForEventQuery request, CancellationToken cancellationToken)
        {
            var tables = await _context.Tables
                .AsNoTracking()
                .Where(x => x.EventId == request.EventId)
                .OrderBy(x => x.TableNumber)
                .Select(x => x.TableNumber)
                .ToArrayAsync();

            var sparsedTables = new ArrayList();
            var compareTo = 1;

            foreach (var table in tables)
            {
                if(table - compareTo > 0)
                {
                    sparsedTables.AddRange(
                        new int[table - compareTo]
                          .Select((value, index) => 
                            value = compareTo + index
                        ).ToArray());
                }
                compareTo = table + 1;
            }
            sparsedTables.Add(compareTo);

            return new SparsedTablesResponse(sparsedTables);
        }
    }
}
