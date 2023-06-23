using MediatR;
using SwiftEvents.Application.Responses;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Queries.Guests
{
    public class GetPaginatedWithSearchGuestsForEventQuery : IRequest<PaginatedResponse<Guest>>
    {
        public GetPaginatedWithSearchGuestsForEventQuery(Guid eventId, PaginationSearchFilter filter)
        {
            EventId = eventId;
            Filter = filter;
        }

        public Guid EventId { get; }
        public PaginationSearchFilter Filter { get; }
    }
}
