using SwiftEvents.Application.Configurations;
using SwiftEvents.Application.Exceptions;
using SwiftEvents.Application.Extensions;
using SwiftEvents.Application.Requests;
using SwiftEvents.Application.Services.BloblServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Services.BlobServices
{
    public class BlobService : BlobServiceBase, IBlobService
    {
        public BlobService(AzureBlobConfiguration blobConfiguration) : base(blobConfiguration)
        {
        }

        public async Task<string> UploadFileAsync(FileUploadRequest uploadRequest)
        {
            var blob = await CreateBlob(uploadRequest.EventId.ToString(), uploadRequest.FileName);
            var file = uploadRequest.Base64File.ExtractBase64().GetBytes();
            var exist = await blob.ExistsAsync();
            if (exist)
                throw new FileException("File with that name already exists.");
            var memoryStream = new MemoryStream(file);
            await blob.UploadAsync(memoryStream);
            var uri = blob.Uri.AbsoluteUri;
            return uri;
        }

        public async Task<bool> DeleteFileAsync(string folder, string fileName)
        {
            var blob = await CreateBlob(folder, fileName);
            return await blob.DeleteIfExistsAsync();
        }
    }
}
