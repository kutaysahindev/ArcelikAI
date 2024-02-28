namespace ArcelikWebApi.Models
{
    public class CreateQuestionDTO
    {
        public string QuestionType { get; set; }

        public string QuestionText { get; set; }

        public List<string> Choices { get; set; }

        public List<string> CorrectAnswers { get; set; }

    }
}