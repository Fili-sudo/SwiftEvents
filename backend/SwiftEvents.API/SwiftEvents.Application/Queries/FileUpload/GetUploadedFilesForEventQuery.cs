using MediatR;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Queries.FileUpload
{
    public class GetUploadedFilesForEventQuery : IRequest<List<UploadedFile>>
    {
        public GetUploadedFilesForEventQuery(Guid eventId)
        {
            EventId = eventId;
        }

        public Guid EventId { get; }
    }
}
