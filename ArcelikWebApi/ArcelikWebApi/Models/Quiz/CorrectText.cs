using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArcelikWebApi.Models.Quiz
{
	public class CorrectText
	{
		[Key]
		public int CorrectTextID { get; set; }

        [ForeignKey("Question")]
		public int QuestionID { get; set; }

        public string CorrectTextAnswer { get; set; }

        public int TextScore { get; set; }

        public Questions Questions { get; set; }
    }
}

