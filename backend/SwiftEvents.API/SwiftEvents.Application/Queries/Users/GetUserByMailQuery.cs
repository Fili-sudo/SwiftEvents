using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Queries.Users
{
    public class GetUserByMailQuery : IRequest<User>
    {
        public GetUserByMailQuery(string mail)
        {
            Mail = mail;
        }

        public string Mail { get; }
    }
}
