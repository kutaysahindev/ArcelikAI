namespace ArcelikWebApi.Models.Quiz
{
    public class UserResponseDTO
    {
        public int ReceivedQuestionID { get; set; }

        public string ReceivedQuestionType { get; set; }

        public int? ReceivedChoiceID { get; set; }

        public string? ReceivedTextAnswer { get; set; }

        public int? ReceivedSortingOrder { get; set; }
    }

}
