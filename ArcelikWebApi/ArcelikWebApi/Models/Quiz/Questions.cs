using Microsoft.Extensions.Options;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArcelikWebApi.Models.Quiz
{
    public class Questions
    {
        [Key]
        public int QuestionID { get; set; }

        public string QuestionText { get; set; }

        public string QuestionType { get; set; }

        public ICollection<Choices> Choices { get; set; }

        public ICollection<CorrectChoices> CorrectChoices { get; set; }

        public CorrectText CorrectText { get; set; }

        public CorrectSorting CorrectSorting { get; set; }

    }
}

