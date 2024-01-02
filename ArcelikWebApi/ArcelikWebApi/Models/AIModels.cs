using System;
namespace ArcelikWebApi.Models
{
    public class AIModels
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ShortDescription { get; set; }

        // Constructor to initialize non-nullable properties
        public AIModels(int id, string name, string shortDescription)
        {
            Id = id;
            Name = name;
            ShortDescription = shortDescription;
        }

    }
}

