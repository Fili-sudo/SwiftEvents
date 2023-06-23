using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Guests
{
    public class UnsignGuestFromTableCommand : IRequest<Guest>
    {
        public UnsignGuestFromTableCommand(Guid guestId)
        {
            Id = guestId;
        }

        public Guid Id { get; }
    }
}
