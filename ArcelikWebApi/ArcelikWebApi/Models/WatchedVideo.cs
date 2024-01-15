using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
    public class WatchedVideo
    {
        [Key]
        public int Id { get; set; } //primary key id to save table to the db
        public int VideoId { get; set; } //id that will be sent from frontend will saved db in here
        public int DurationInSeconds { get; set; } //time that will be sent from frontend will saved in here

        // Foreign key to User
        public Guid Userid { get; set; }  // Foreign key property(no need to use it now)
        public string? Email { get; set; } // Foreign key property
        public Users User { get; set; }    // Navigation property
    }
}
