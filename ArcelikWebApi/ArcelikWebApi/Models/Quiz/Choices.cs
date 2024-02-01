using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArcelikWebApi.Models.Quiz
{
    public class Choices
    {
        [Key]
        public int ChoiceID { get; set; }

        [ForeignKey("Question")] // Define foreign key
        public int QuestionID { get; set; }

        public string ChoiceText { get; set; }

        // Navigation property for one-to-many relationship
        public Questions Questions { get; set; }

        // Navigation property for one-to-one relationship

        public CorrectChoices CorrectChoices { get; set; }
    }
}
