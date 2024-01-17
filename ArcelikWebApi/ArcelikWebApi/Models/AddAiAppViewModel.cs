using System;
namespace ArcelikWebApi.Models
{
    public class AddAiAppViewModel
    {

        public string AppName { get; set; }

        public string WelcomeMessage { get; set; }

        public string SystemPrompt { get; set; }

        public string SelectedModel { get; set; }

        public bool UseKnowledgebase { get; set; }

        public bool Enable_Upload_Pdf_File { get; set; }

        public int ConversationRetentionPeriod { get; set; }

        public float ModalTemperature { get; set; }

        public List<IFormFile>? Pdfs { get; set; }

        public DateTime Date { get; set; }
    }
}

