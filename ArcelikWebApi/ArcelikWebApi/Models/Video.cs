﻿using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
    public class Video
    {
        [Key]
        public int Id { get; set; }

        public string? Title { get; set; }

        public int VideoDuration { get; set; }

        public string? BlobStorageUrl { get; set; }

        public List<UserVideo> UsersWhoWatched { get; set; }

    }
}
