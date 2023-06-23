using Azure.Storage.Blobs;
using SwiftEvents.Application.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Services.BlobServices
{
    public class BlobServiceBase
    {
        public BlobServiceBase(AzureBlobConfiguration blobConfiguration)
        {
            BlobConfiguration = blobConfiguration;
        }

        public AzureBlobConfiguration BlobConfiguration { get; }

        private BlobContainerClient GetContainer()
        {
            var blobServiceClient = new BlobServiceClient(BlobConfiguration.ConnectionString);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient(BlobConfiguration.ContainerName);
            return blobContainerClient;
        }

        protected async Task<BlobClient> CreateBlob(string folderName, string fileName)
        {
            var container = GetContainer();
            await container.CreateIfNotExistsAsync();
            var blobClient = container.GetBlobClient(folderName + "/" + fileName);
            return blobClient;
        }
    }
}
