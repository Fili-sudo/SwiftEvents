using MediatR;
using SwiftEvents.Application.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Queries.Tables
{
    public class GetSparsedTablesForEventQuery : IRequest<SparsedTablesResponse>
    {
        public GetSparsedTablesForEventQuery(Guid eventId)
        {
            EventId = eventId;
        }

        public Guid EventId { get; }
    }
}
