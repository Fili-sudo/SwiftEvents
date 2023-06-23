using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Events
{
    public class DeleteEventByIdCommand : IRequest<Event>
    {
        private Guid _eventId;

        public DeleteEventByIdCommand(Guid eventId)
        {
            _eventId = eventId;
        }

        public Guid EventId 
        { 
            get 
            { 
                return _eventId; 
            }
        }

    }
}
