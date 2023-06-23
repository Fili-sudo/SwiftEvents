using SwiftEvents.Application.Configurations;
using SwiftEvents.Application.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Services.BloblServices.Interfaces
{
    public interface IBlobService
    {
        AzureBlobConfiguration BlobConfiguration { get; }
        Task<string> UploadFileAsync(FileUploadRequest uploadRequest);
        Task<bool> DeleteFileAsync(string folder, string fileName);
    }
}
