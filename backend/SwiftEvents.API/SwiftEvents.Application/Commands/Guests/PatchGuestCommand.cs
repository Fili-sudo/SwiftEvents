using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Guests
{
    public class PatchGuestCommand : IRequest<bool>
    {
        public PatchGuestCommand(Guid guestId, string name, string phoneNumber)
        {
            GuestId = guestId;
            Name = name;
            PhoneNumber = phoneNumber;
        }

        public Guid GuestId { get; }
        public string Name { get; }
        public string PhoneNumber { get; }
    }
}
