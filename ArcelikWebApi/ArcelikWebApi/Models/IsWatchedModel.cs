﻿namespace ArcelikWebApi.Models
{
    public class IsWatchedModel
    {
        public bool IsWatched { get; set; }

        public int? VideoTimeWatched { get; set; }

        public int VideoId { get; set; }

        public int DurationInSeconds { get; set; }
    }

}

