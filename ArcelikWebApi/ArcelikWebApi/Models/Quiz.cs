using System;
using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
	public class Quiz
	{
		[Key]
		public int id { get; set; }

		public string Question { get; set; }

        public Dictionary<int, string>? Options { get; set; }

		public string Answer { get; set; }

		public int Point { get; set; }

	}
}

