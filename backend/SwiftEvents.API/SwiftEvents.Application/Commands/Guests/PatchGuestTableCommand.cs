using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Guests
{
    public class PatchGuestTableCommand : IRequest<bool>
    {
        public PatchGuestTableCommand(Guid guestId, Guid tableId)
        {
            GuestId = guestId;
            TableId = tableId;
        }

        public Guid GuestId { get; }
        public Guid TableId { get; }
    }
}
