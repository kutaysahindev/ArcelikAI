namespace ArcelikWebApi.Models.Admin
{
    public class UpdateVideoDTO
    {
        public string? Title { get; set; }
        public IFormFile? VideoFile { get; set; }
    }
}
