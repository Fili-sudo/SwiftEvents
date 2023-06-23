using MediatR;
using SwiftEvents.Application.Requests.Tables;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Tables
{
    public class AddRecommendedRangeTablesCommand : IRequest<List<Table>>
    {
        public AddRecommendedRangeTablesCommand(Guid eventId, CreateRangeOfTablesRequest createRange)
        {
            EventId = eventId;
            CreateRange = createRange;
        }

        public Guid EventId { get; }
        public CreateRangeOfTablesRequest CreateRange { get; }
    }
}
