using MediatR;
using SwiftEvents.Application.Requests;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Commands.FileUpload
{
    public class FileUploadCommand : IRequest<UploadedFile>
    {
        public FileUploadCommand(FileUploadRequest uploadRequest)
        {
            UploadRequest = uploadRequest;
        }

        public FileUploadRequest UploadRequest{ get; }
    }
}
