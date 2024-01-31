using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArcelikWebApi.Models.Quiz
{
	public class CorrectSorting
	{
		[Key]
		public int CorrectSortingID { get; set; }

        [ForeignKey("Question")]
		public int QuestionID { get; set; }

        public int SortingOrder { get; set; }

        public int SortingScore { get; set; }

        public Questions Questions { get; set; }

    }
}

