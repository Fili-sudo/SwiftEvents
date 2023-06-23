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
    public class GetUserByMailQueryHandler : IRequestHandler<GetUserByMailQuery, User>
    {
        private readonly AppDbContext _context;

        public GetUserByMailQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> Handle(GetUserByMailQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Mail == request.Mail);
            return user;
        }
    }
}
