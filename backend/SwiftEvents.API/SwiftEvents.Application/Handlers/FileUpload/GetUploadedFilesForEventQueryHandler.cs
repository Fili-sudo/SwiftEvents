using MediatR;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.Application.Handlers.Tables;
using SwiftEvents.Application.Queries.FileUpload;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.FileUpload
{
    public class GetUploadedFilesForEventQueryHandler : IRequestHandler<GetUploadedFilesForEventQuery, List<UploadedFile>>
    {
        private readonly AppDbContext _context;

        public GetUploadedFilesForEventQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UploadedFile>> Handle(GetUploadedFilesForEventQuery request, CancellationToken cancellationToken)
        {
            var files = await _context.UploadedFiles
                .Where(x => x.EventId == request.EventId)
                .ToListAsync();

            return files;
        }
    }
}
