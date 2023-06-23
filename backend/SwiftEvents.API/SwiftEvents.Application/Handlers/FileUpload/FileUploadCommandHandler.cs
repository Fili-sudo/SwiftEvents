using Azure.Core;
using MediatR;
using SwiftEvents.Application.Commands.FileUpload;
using SwiftEvents.Application.Exceptions;
using SwiftEvents.Application.Services.BloblServices.Interfaces;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Handlers.FileUpload
{
    public class FileUploadCommandHandler : IRequestHandler<FileUploadCommand, UploadedFile>
    {
        private readonly AppDbContext _context;
        private readonly IBlobService _blobService;

        public FileUploadCommandHandler(AppDbContext context, IBlobService blobService)
        {
            _context = context;
            _blobService = blobService;
        }

        public async Task<UploadedFile> Handle(FileUploadCommand command, CancellationToken cancellationToken)
        {
            var @event = GetEvent(command);
            if (@event == null)
                throw new FileException("Event not found");

            try
            {
                var absoluteUri = await _blobService.UploadFileAsync(command.UploadRequest);
                var uploadedFile = CreateNewUploadedFile(command, absoluteUri);
                _context.UploadedFiles.Add(uploadedFile);
                var result = await _context.SaveChangesAsync(cancellationToken);
                if (result == 0)
                    throw new FileException("File not uploaded");
                return uploadedFile;
            }
            catch (FileException)
            {
                throw;
            }

        }

        private Event? GetEvent(FileUploadCommand command)
        {
            return _context.Events.FirstOrDefault(x => x.Id == command.UploadRequest.EventId);
        }

        private UploadedFile CreateNewUploadedFile(FileUploadCommand command, string absoluteUri)
        {
            return new UploadedFile
            {
                FileName = command.UploadRequest.FileName,
                AbsoluteUri = absoluteUri,
                EventId = command.UploadRequest.EventId,
                DateCreated = DateTime.Now
            };
        }
    }
}
