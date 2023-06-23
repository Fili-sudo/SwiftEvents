using MediatR;
using SwiftEvents.Application.Commands.Users;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Users
{
    public class CreateUserWithoutGuidCommandHandler : IRequestHandler<CreateUserWithoutGuidCommand, User>
    {
        private readonly AppDbContext _context;

        public CreateUserWithoutGuidCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> Handle(CreateUserWithoutGuidCommand command, CancellationToken cancellationToken)
        {
            await _context.Users.AddAsync(command.User);
            await _context.SaveChangesAsync();
            return await Task.FromResult(command.User);
        }
    }
}
