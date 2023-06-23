using Azure.Core;
using MediatR;
using SwiftEvents.Application.Commands.FileUpload;
using SwiftEvents.Application.Exceptions;
using SwiftEvents.Application.Services.BloblServices.Interfaces;
using SwiftEvents.Data_Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.FileUpload
{
    public class DeleteFileCommandHandler : IRequestHandler<DeleteFileCommand, bool>
    {
        private readonly AppDbContext _context;
        private readonly IBlobService _blobService;

        public DeleteFileCommandHandler(AppDbContext context, IBlobService blobService)
        {
            _context = context;
            _blobService = blobService;
        }

        public async Task<bool> Handle(DeleteFileCommand command, CancellationToken cancellationToken)
        {
            var fileToBeDeleted = _context.UploadedFiles.FirstOrDefault(x => x.Id == command.EventId);
            if (fileToBeDeleted == null)
                return false;
            var isDeleted = await _blobService.DeleteFileAsync(fileToBeDeleted.EventId.ToString(), fileToBeDeleted.FileName);

            if (!isDeleted) return false;

            _context.UploadedFiles.Remove(fileToBeDeleted);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
