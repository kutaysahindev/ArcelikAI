namespace ArcelikWebApi.Models.Admin
{
    public class CreateVideoDTO
    {
        public string Title { get; set; }
        public IFormFile VideoFile { get; set; }
        public int DurationInSeconds { get; set; }
    }
}
