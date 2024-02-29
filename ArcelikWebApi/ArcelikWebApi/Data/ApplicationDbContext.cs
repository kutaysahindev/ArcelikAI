using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;
using ArcelikWebApi.Models.Quiz;

namespace ArcelikWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // DbSet for AiApplication
        public DbSet<AiApplication> AiApplications { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<ApplicationSettings> ApplicationSettings { get; set; }
        public DbSet<Choices> Choices { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<CorrectChoices> CorrectChoices { get; set; }
        public DbSet<CorrectText> CorrectText { get; set; }
        public DbSet<CorrectSorting> CorrectSorting { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //Relationship between choices and Questions
            modelBuilder.Entity<Choices>()
                 .HasOne(q => q.Questions)
                 .WithMany(c => c.Choices)
                 .HasForeignKey(q => q.QuestionID) //sonra bi bak ögren parametrelere
                 .OnDelete(DeleteBehavior.Restrict);

            //Relationship between Correct Choices and Questions
            modelBuilder.Entity<CorrectChoices>()
               .HasOne(q => q.Questions)
               .WithMany(a => a.CorrectChoices)
               .HasForeignKey(q => q.QuestionID)
               .OnDelete(DeleteBehavior.Restrict);

            //Relationship between Correct Choices and Choices
            modelBuilder.Entity<CorrectChoices>()
                .HasOne(c => c.Choices)
                .WithOne(a => a.CorrectChoices)
                .HasForeignKey<CorrectChoices>(c => c.ChoiceID)
                .OnDelete(DeleteBehavior.Restrict);

            //Relationship between Correct Sorting and Questions
            modelBuilder.Entity<CorrectSorting>()
                .HasOne(c => c.Questions)
                .WithOne(a => a.CorrectSorting)
                .HasForeignKey<CorrectSorting>(c => c.QuestionID)
                .OnDelete(DeleteBehavior.Restrict);

            ////Relationship between Correct Text and Questions
            modelBuilder.Entity<CorrectText>()
                .HasOne(q => q.Questions)
                .WithOne(a => a.CorrectText)
                .HasForeignKey<CorrectText>(c => c.QuestionID)
                .OnDelete(DeleteBehavior.Restrict);

            /* unnecessary
            modelBuilder.Entity<Video>().HasData(
                new Video { Id = 2, Title = "Video 2", BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4" },
                new Video { Id = 3, Title = "Video 3", BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" },
                new Video { Id = 4, Title = "Video 4", BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" }
            );
            */

            modelBuilder.Entity<Questions>().HasData(
                // 3 MultipleChoice QuestionType
                new Questions { QuestionID = 1, QuestionText = "What is the capital of France?", QuestionType = "MultipleChoice" },
                new Questions { QuestionID = 2, QuestionText = "Which of the following are prime numbers?", QuestionType = "MultipleChoice" },
                new Questions { QuestionID = 3, QuestionText = "Which city is known as the 'Eternal City'?", QuestionType = "MultipleChoice" },

                // 3 MultipleChoiceAndAnswers
                new Questions { QuestionID = 4, QuestionText = "Select the even numbers:", QuestionType = "MultipleChoiceAndAnswers" },
                new Questions { QuestionID = 5, QuestionText = "Which colors are in a rainbow?", QuestionType = "MultipleChoiceAndAnswers" },
                new Questions { QuestionID = 6, QuestionText = "Choose the correct programming languages:", QuestionType = "MultipleChoiceAndAnswers" },

                // 3 TrueFalse
                new Questions { QuestionID = 7, QuestionText = "Is the Earth flat?", QuestionType = "TrueFalse" },
                new Questions { QuestionID = 8, QuestionText = "Do cats meow?", QuestionType = "TrueFalse" },
                new Questions { QuestionID = 9, QuestionText = "Is water wet?", QuestionType = "TrueFalse" },

                // 3 FillInTheBlank
                new Questions { QuestionID = 10, QuestionText = "The capital of Spain is ________.", QuestionType = "FillInTheBlank" },
                new Questions { QuestionID = 11, QuestionText = "The sum of 5 and 3 is ________.", QuestionType = "FillInTheBlank" },
                new Questions { QuestionID = 12, QuestionText = "C# is a ________ language.", QuestionType = "FillInTheBlank" },

                // 3 Sorting
                new Questions { QuestionID = 13, QuestionText = "Sort the following numbers in ascending order:", QuestionType = "Sorting" },
                new Questions { QuestionID = 14, QuestionText = "Arrange these colors alphabetically: Blue, Red, Green, Yellow.", QuestionType = "Sorting" },
                new Questions { QuestionID = 15, QuestionText = "Order these programming languages by release date: C++, Java, Python, JavaScript.", QuestionType = "Sorting" }
            );

            // Seed Answers for the MultipleChoice/True/False question
            // Insert Choices for MultipleChoice, MultipleChoiceAndAnswers, TrueFalse, and Sorting
            modelBuilder.Entity<Choices>().HasData(
                // Choices for MultipleChoice (QuestionID: 1, 2, 3)
                new Choices { ChoiceID = 1, QuestionID = 1, ChoiceText = "Berlin" },
                new Choices { ChoiceID = 2, QuestionID = 1, ChoiceText = "Paris" },
                new Choices { ChoiceID = 3, QuestionID = 1, ChoiceText = "London" },
                new Choices { ChoiceID = 4, QuestionID = 1, ChoiceText = "Madrid" },
                new Choices { ChoiceID = 5, QuestionID = 2, ChoiceText = "2" },
                new Choices { ChoiceID = 6, QuestionID = 2, ChoiceText = "5" },
                new Choices { ChoiceID = 7, QuestionID = 2, ChoiceText = "8" },
                new Choices { ChoiceID = 8, QuestionID = 2, ChoiceText = "11" },
                new Choices { ChoiceID = 9, QuestionID = 3, ChoiceText = "Rome" },
                new Choices { ChoiceID = 10, QuestionID = 3, ChoiceText = "Athens" },
                new Choices { ChoiceID = 11, QuestionID = 3, ChoiceText = "Jerusalem" },
                new Choices { ChoiceID = 12, QuestionID = 3, ChoiceText = "Istanbul" },

                // Choices for MultipleChoiceAndAnswers (QuestionID: 4, 5, 6)
                new Choices { ChoiceID = 13, QuestionID = 4, ChoiceText = "2" },
                new Choices { ChoiceID = 14, QuestionID = 4, ChoiceText = "4" },
                new Choices { ChoiceID = 15, QuestionID = 4, ChoiceText = "6" },
                new Choices { ChoiceID = 16, QuestionID = 4, ChoiceText = "8" },
                new Choices { ChoiceID = 17, QuestionID = 5, ChoiceText = "Red" },
                new Choices { ChoiceID = 18, QuestionID = 5, ChoiceText = "Black" },
                new Choices { ChoiceID = 19, QuestionID = 5, ChoiceText = "Blue" },
                new Choices { ChoiceID = 20, QuestionID = 5, ChoiceText = "Yellow" },
                new Choices { ChoiceID = 21, QuestionID = 6, ChoiceText = "CC#" },
                new Choices { ChoiceID = 22, QuestionID = 6, ChoiceText = "Python" },
                new Choices { ChoiceID = 23, QuestionID = 6, ChoiceText = "Javax" },
                new Choices { ChoiceID = 24, QuestionID = 6, ChoiceText = "JavaScript" },

                // Choices for TrueFalse (QuestionID: 7, 8, 9)
                new Choices { ChoiceID = 25, QuestionID = 7, ChoiceText = "True" },
                new Choices { ChoiceID = 26, QuestionID = 7, ChoiceText = "False" },
                new Choices { ChoiceID = 27, QuestionID = 8, ChoiceText = "True" },
                new Choices { ChoiceID = 28, QuestionID = 8, ChoiceText = "False" },
                new Choices { ChoiceID = 29, QuestionID = 9, ChoiceText = "True" },
                new Choices { ChoiceID = 30, QuestionID = 9, ChoiceText = "False" },

                // Choices for Sorting (QuestionID: 13, 14, 15)
                new Choices { ChoiceID = 31, QuestionID = 13, ChoiceText = "1" },
                new Choices { ChoiceID = 32, QuestionID = 13, ChoiceText = "2" },
                new Choices { ChoiceID = 33, QuestionID = 13, ChoiceText = "4" },
                new Choices { ChoiceID = 34, QuestionID = 13, ChoiceText = "3" },
                new Choices { ChoiceID = 35, QuestionID = 14, ChoiceText = "Red" },
                new Choices { ChoiceID = 36, QuestionID = 14, ChoiceText = "Green" },
                new Choices { ChoiceID = 37, QuestionID = 14, ChoiceText = "Yellow" },
                new Choices { ChoiceID = 38, QuestionID = 14, ChoiceText = "Blue" },
                new Choices { ChoiceID = 39, QuestionID = 15, ChoiceText = "Java" },
                new Choices { ChoiceID = 40, QuestionID = 15, ChoiceText = "C++" },
                new Choices { ChoiceID = 41, QuestionID = 15, ChoiceText = "JavaScript" },
                new Choices { ChoiceID = 42, QuestionID = 15, ChoiceText = "Python" }
            );

            // Insert CorrectChoices for MultipleChoice, MultipleChoiceAndAnswers, TrueFalse
            modelBuilder.Entity<CorrectChoices>().HasData(
                // CorrectChoices for MultipleChoice (QuestionID: 1, 2, 3)
                new CorrectChoices { CorrectChoiceID = 1, QuestionID = 1, ChoiceID = 2, PartialScore = 10 },
                new CorrectChoices { CorrectChoiceID = 2, QuestionID = 2, ChoiceID = 5, PartialScore = 10 },
                new CorrectChoices { CorrectChoiceID = 3, QuestionID = 3, ChoiceID = 10, PartialScore = 10 },

                // CorrectChoices for MultipleChoiceAndAnswers (QuestionID: 4, 5, 6)
                new CorrectChoices { CorrectChoiceID = 4, QuestionID = 4, ChoiceID = 13, PartialScore = 2 },
                new CorrectChoices { CorrectChoiceID = 5, QuestionID = 4, ChoiceID = 14, PartialScore = 2 },
                new CorrectChoices { CorrectChoiceID = 6, QuestionID = 4, ChoiceID = 15, PartialScore = 2 },
                new CorrectChoices { CorrectChoiceID = 7, QuestionID = 4, ChoiceID = 16, PartialScore = 2 },
                new CorrectChoices { CorrectChoiceID = 8, QuestionID = 5, ChoiceID = 17, PartialScore = 2 },
                new CorrectChoices { CorrectChoiceID = 9, QuestionID = 5, ChoiceID = 19, PartialScore = 2 },
                new CorrectChoices { CorrectChoiceID = 10, QuestionID = 5, ChoiceID = 20, PartialScore = 2 },
                new CorrectChoices { CorrectChoiceID = 11, QuestionID = 6, ChoiceID = 22, PartialScore = 2 },
                new CorrectChoices { CorrectChoiceID = 12, QuestionID = 6, ChoiceID = 24, PartialScore = 2 },

                // CorrectChoices for TrueFalse (QuestionID: 7, 8, 9)
                new CorrectChoices { CorrectChoiceID = 13, QuestionID = 7, ChoiceID = 26, PartialScore = 5 },
                new CorrectChoices { CorrectChoiceID = 14, QuestionID = 8, ChoiceID = 27, PartialScore = 5 },
                new CorrectChoices { CorrectChoiceID = 15, QuestionID = 9, ChoiceID = 29, PartialScore = 5 }
            );

            // Insert CorrectSorting for Sorting
            modelBuilder.Entity<CorrectSorting>().HasData(
                // CorrectSorting for Sorting (QuestionID: 13, 14, 15)
                new CorrectSorting { CorrectSortingID = 1, QuestionID = 13, SortingOrder = 31323433, SortingScore = 10 },
                new CorrectSorting { CorrectSortingID = 2, QuestionID = 14, SortingOrder = 38363735, SortingScore = 10 },
                new CorrectSorting { CorrectSortingID = 3, QuestionID = 15, SortingOrder = 40394241, SortingScore = 10 }
            );

            // Insert CorrectText for FillInTheBlank
            modelBuilder.Entity<CorrectText>().HasData(
                // CorrectText for FillInTheBlank (QuestionID: 10, 11, 12)
                new CorrectText { CorrectTextID = 1, QuestionID = 10, CorrectTextAnswer = "Madrid", TextScore = 5 },
                new CorrectText { CorrectTextID = 2, QuestionID = 11, CorrectTextAnswer = "8", TextScore = 5 },
                new CorrectText { CorrectTextID = 3, QuestionID = 12, CorrectTextAnswer = "programming", TextScore = 5 }
            );


            modelBuilder.Entity<ApplicationSettings>()
                .HasData(
                new ApplicationSettings { id = 1, LandingUrl = "Somelink will be here", SupportedFileTypes = "Pdf" });


        }

    }
}

