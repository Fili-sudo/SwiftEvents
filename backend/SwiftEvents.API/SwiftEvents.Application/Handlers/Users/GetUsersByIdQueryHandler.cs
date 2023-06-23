using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Queries.Users;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.Users
{
    public class GetUsersByIdQueryHandler : IRequestHandler<GetUsersByIdQuery, User>
    {
        private readonly AppDbContext _context;

        public GetUsersByIdQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> Handle(GetUsersByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.Id);
            return user;
        }
    }
}
