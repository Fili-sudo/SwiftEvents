using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Users
{
    public class CreateUserCommand : IRequest<User>
    {
        public CreateUserCommand(User user)
        {
            User = user;
        }

        public User User { get; }
    }
}
