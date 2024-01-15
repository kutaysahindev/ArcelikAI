using System;
using ArcelikWebApi.Models;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace ArcelikWebApi.Services
{
    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;
        
        public BlobService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient; 
        }

      
        public async Task<string> Upload(IFormFile fileUpload)
        {
            var containerName = "file-upload"; // Change this to your actual container name
            var containerInstance = _blobServiceClient.GetBlobContainerClient(containerName);

            var blobName = fileUpload.FileName;
            var blobInstance = containerInstance.GetBlobClient(blobName);

            await blobInstance.UploadAsync(fileUpload.OpenReadStream());

            // Construct and return the Blob URL
            return $"{containerInstance.Uri}/{blobName}";
        }
        


    }
}

