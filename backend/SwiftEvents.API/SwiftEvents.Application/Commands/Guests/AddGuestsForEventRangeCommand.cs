using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Guests
{
    public class AddGuestsForEventRangeCommand : IRequest<List<Guest>>
    {
        public AddGuestsForEventRangeCommand(List<Guest> guestsList, Guid eventId)
        {
            foreach (Guest guest in guestsList)
            {
                guest.EventId = eventId;
            }
            GuestsList = guestsList;
            EventId = eventId;
        }

        public List<Guest> GuestsList { get; }
        public Guid EventId { get; }
    }
}
