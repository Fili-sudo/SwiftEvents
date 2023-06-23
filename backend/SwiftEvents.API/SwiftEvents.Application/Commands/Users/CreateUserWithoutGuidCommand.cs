using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Users
{
    public class CreateUserWithoutGuidCommand : IRequest<User>
    {
        public CreateUserWithoutGuidCommand(User user)
        {
            User = user;
        }

        public User User { get; }
    }
}
