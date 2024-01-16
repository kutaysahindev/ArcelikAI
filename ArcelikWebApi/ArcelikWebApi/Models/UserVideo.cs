using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
    public class UserVideo
    {
        // Foreign key to Video
        public int VideoId { get; set; } //foreign key property of video guid id

        public Video Video { get; set; } // nagivation property to video class
      
        // Foreign key to User
        public Guid Userid { get; set; }  // Foreign key property(no need to use it now)
        public Users User { get; set; }    // Navigation property

        public int WatchedTimeInSeconds { get; set; } //time that will be sent from frontend

    }
}
