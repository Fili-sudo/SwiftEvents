using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.FileUpload
{
    public class DeleteFileCommand : IRequest<bool>
    {
        public DeleteFileCommand(Guid eventId)
        {
            EventId = eventId;
        }

        public Guid EventId { get; }
    }
}
