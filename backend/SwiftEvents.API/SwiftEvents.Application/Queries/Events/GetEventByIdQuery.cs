using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Queries.Events
{
    public class GetEventByIdQuery : IRequest<Event>
    {
        public GetEventByIdQuery(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; }
    }
}
