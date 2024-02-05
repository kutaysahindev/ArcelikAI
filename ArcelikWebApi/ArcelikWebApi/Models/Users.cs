using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ArcelikWebApi.Models
{
    public class Users
    {
        [Key]
        public Guid id { get; set; }

        public string Email { get; set; }

        public bool isWatchedAll { get; set; }

        public bool isTutorialDone { get; set; }

        public int QuizPoint { get; set; }

        public bool IsPassed { get; set; }

        // Properties for watched video
        public int WatchedVideoId { get; set; }

        public Video WatchedVideo { get; set; }

        public int WatchedTimeInSeconds { get; set; }
    }
}