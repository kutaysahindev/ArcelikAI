using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
    public class Users
    {
        [Key]
        public Guid id { get; set; }

        public string Email { get; set; }

        public bool isWatched { get; set; }

        public List<UserVideo> WatchedVideos { get; set; }


    }
}