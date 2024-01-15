namespace ArcelikWebApi.Models
{
    public class Videos
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int DurationInSeconds { get; set; }

        public string BlobStorageUrl { get; set; }
        // Add other properties as needed
    }
}
