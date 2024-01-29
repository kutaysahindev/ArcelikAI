using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArcelikWebApi.Models
{
	public class Quiz
	{
		[Key]
		public int id { get; set; }

		public string Question { get; set; }

		[NotMapped]
        public List<string?> Options { get; set; }

		public string Answer { get; set; }

		public int Point { get; set; }

	}
}

