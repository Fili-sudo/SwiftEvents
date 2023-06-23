using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Queries.Events
{
    public class GetEventsForUserQuery : IRequest<List<Event>>
    {
        private Guid _userId;

        public GetEventsForUserQuery(Guid userId)
        {
            _userId = userId;
        }

        public Guid UserId 
        { 
            get 
            { 
                return _userId; 
            } 
        }
    }
}
