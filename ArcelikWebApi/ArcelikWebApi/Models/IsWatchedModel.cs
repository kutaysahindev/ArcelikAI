namespace ArcelikWebApi.Models
{
    public class IsWatchedModel
    {
        public bool IsWatched { get; set; } // initial data comes from frontend first set in here

        public int VideoId { get; set; } // initial data comes from frontend first set in here

        public int DurationInSeconds { get; set; } // initial data comes from frontend first set in here
    }

}

