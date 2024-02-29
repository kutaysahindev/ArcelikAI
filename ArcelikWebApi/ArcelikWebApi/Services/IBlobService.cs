namespace ArcelikWebApi.Services
{
    public interface IBlobService
    {
        Task<string> Upload(IFormFile fileUpload, string containername);

        Task Delete(string blobUrl, string containername);

    }
}
