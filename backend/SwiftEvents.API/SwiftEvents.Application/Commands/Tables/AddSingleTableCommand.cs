using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.Tables
{
    public class AddSingleTableCommand : IRequest<Table>
    {
        public AddSingleTableCommand(Table table)
        {
            Table = table;
        }

        public Table Table { get; }
    }
}
