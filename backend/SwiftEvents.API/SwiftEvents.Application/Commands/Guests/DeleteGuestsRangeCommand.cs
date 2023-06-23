using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Guests
{
    public class DeleteGuestsRangeCommand : IRequest<List<Guest>>
    {
        public DeleteGuestsRangeCommand(List<Guid> guestIds)
        {
            GuestIds = guestIds;
        }

        public List<Guid> GuestIds { get; }
    }
}
