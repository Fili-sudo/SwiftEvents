using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Events
{
    public class CreateNewEventForUserCommand : IRequest<Event>
    {
        public CreateNewEventForUserCommand(Event @event, int noOfGuests, bool sendMail)
        {
            Event = @event;
            NoOfGuests = noOfGuests;
            SendMail = sendMail;
        }

        public Event Event { get; }
        public int NoOfGuests { get; }
        public bool SendMail { get; }
    }
}
