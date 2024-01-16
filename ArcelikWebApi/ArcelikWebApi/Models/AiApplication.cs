using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
    public class AiApplication
    {
        [Key]
        public Guid id { get; set; }

        public string AppName { get; set; }

        public string WelcomeMessage { get; set; }

        public string SystemPrompt { get; set; }

        public string SelectedModel { get; set; }

        public bool UseKnowledgebase { get; set; }

        public bool EnableUploadPdfFile { get; set; }

        public int ConversationRetentionPeriod { get; set; }

        public float ModalTemperature { get; set; }

        public string? Pdfs_Urls { get; set; }

        public string Email { get; set; }

        public DateTime Date { get; set; }
        
    }
}

