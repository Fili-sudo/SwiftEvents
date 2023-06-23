using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Tables
{
    public class DeleteTableCommand : IRequest<Table>
    {
        public DeleteTableCommand(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; }
    }
}
