using MediatR;
using SwiftEvents.Application.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Queries.Tables
{
    public class GetPercentageFulledTablesQuery : IRequest<PercentageFractionResponse>
    {
        public GetPercentageFulledTablesQuery(Guid eventId)
        {
            EventId = eventId;
        }

        public Guid EventId { get; }
    }
}
