using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
    public class WatchedVideo
    {
        [Key]
        public int Id { get; set; }
        public int VideoId { get; set; }
        public int DurationInSeconds { get; set; }

        // Foreign key to User
        public Guid Userid { get; set; }  // Foreign key property
        public Users User { get; set; }    // Navigation property
    }
}
