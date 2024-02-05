namespace ArcelikWebApi.Models.Quiz
{
    public class QuestionDTO
    {
        public int QuestionID { get; set; }
        public string QuestionText { get; set; }
        public string QuestionType { get; set; }
        public List<ChoiceDTO> Choices { get; set; }

    }
    public class ChoiceDTO

    {
        public int ChoiceID { get; set; }
        public string ChoiceText { get; set; }
    }


}
