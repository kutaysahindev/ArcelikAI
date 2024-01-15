namespace ArcelikWebApi.Models
{
    public class Video
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public int DurationInSeconds { get; set; }

        public string? BlobStorageUrl { get; set; }
        
    }
}
