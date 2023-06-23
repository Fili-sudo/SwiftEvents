using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Queries.Guests
{
    public class GetGuestByIdDetailedQuery : IRequest<Guest>
    {
        public GetGuestByIdDetailedQuery(Guid guestId)
        {
            GuestId = guestId;
        }

        public Guid GuestId { get; }
    }
}
