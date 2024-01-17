using System;
namespace ArcelikWebApi.Models
{
    public class WatchedVideoUpdateRequest
    {
        public bool IsWatchedAll { get; set; }

        public int WatchedVideoId { get; set; }

        public int WatchedTimeInSeconds { get; set; }
    }

}

