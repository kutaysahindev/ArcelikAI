using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models.Quiz
{
    public class CorrectChoices
    {
        [Key]
        public int CorrectChoiceID { get; set; }

        [ForeignKey("Questions")] // Define foreign key
        public int QuestionID { get; set; }

        [ForeignKey("Choices")]
        public int ChoiceID { get; set; }

        public int PartialScore { get; set; }

        // Navigation property for one-to-many relationship
        public Questions Questions { get; set; }  

        // Navigation property for one-to-one? relationship
        public Choices Choices { get; set; }

    }
}
