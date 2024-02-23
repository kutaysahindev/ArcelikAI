using System;
namespace ArcelikWebApi.Models
{
    public class AddQuestionDTO
    {
        public string QuestionType { get; set; }

        public string QuestionText { get; set; }

        public List<string> Choices { get; set; }

        public List<string> CorrectAnswers { get; set; }

    }
}
