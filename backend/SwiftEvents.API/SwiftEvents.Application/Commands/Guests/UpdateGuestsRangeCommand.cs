using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Guests
{
    public class UpdateGuestsRangeCommand : IRequest<List<Guest>>
    {
        public UpdateGuestsRangeCommand(List<Guest> guests)
        {
            Guests = guests;
        }

        public List<Guest> Guests { get; }
    }
}
