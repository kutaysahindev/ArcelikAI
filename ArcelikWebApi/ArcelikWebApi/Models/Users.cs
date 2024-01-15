using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
    public class Users
    {
        [Key]
        public Guid id { get; set; }

        public string Email { get; set; }

        public bool isWatched { get; set; }

        public ICollection<WatchedVideo> WatchedVideos { get; set; } = new List<WatchedVideo>();

        public double MinutesWatched { get; set; } // Changed to double for decimal specify
    }
}