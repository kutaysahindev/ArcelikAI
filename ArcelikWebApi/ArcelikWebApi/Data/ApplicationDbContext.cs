using System;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;
using ArcelikWebApi.Models.Quiz;
using Microsoft.Extensions.Options;

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
            modelBuilder.Entity<Users>()
                .HasOne(u => u.WatchedVideo)
                .WithMany()
                .HasForeignKey(u => u.WatchedVideoId);

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

            modelBuilder.Entity<Video>().HasData(
                new Video { Id = 1, Title = "Video 1", VideoDuration = 5, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample1.mp4" },
                new Video { Id = 2, Title = "Video 2", VideoDuration = 8, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4" },
                new Video { Id = 3, Title = "Video 3", VideoDuration = 10, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" },
                new Video { Id = 4, Title = "Video 4", VideoDuration = 11, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" }
                            );

            modelBuilder.Entity<Questions>().HasData(
                new Questions { QuestionID = 1, QuestionText = "What is the capital of France?", QuestionType = "MultipleChoice" },
                new Questions { QuestionID = 2, QuestionText = "Which of the following are prime numbers?", QuestionType = "MultipleChoiceAndAnswers" },
                new Questions { QuestionID = 3, QuestionText = "Is the sky blue?", QuestionType = "TrueFalse" },
                new Questions { QuestionID = 4, QuestionText = "The complexity of bubble sort algorithm is _______ to the square of the number of elements.", QuestionType = "FillInTheBlank" },
                new Questions { QuestionID = 5, QuestionText = "Arrange the following data structures in ascending order of their average time complexity for searching: Linked List, Binary Search Tree, Hash Table, Array", QuestionType = "Sorting" },
                new Questions { QuestionID = 6, QuestionText = "Is water wet?", QuestionType = "TrueFalse" },
                new Questions { QuestionID = 7, QuestionText = "Fill in the blank: Speed of light is ______ km/s.", QuestionType = "FillInTheBlank" },
                new Questions { QuestionID = 8, QuestionText = "What is the capital of Japan?", QuestionType = "MultipleChoice" },
                new Questions { QuestionID = 9, QuestionText = "Sort the following numbers in ascending order: 3, 1, 2, 4", QuestionType = "Sorting" },
                new Questions { QuestionID = 10, QuestionText = "Fill in the blank: The sun rises in the ______.", QuestionType = "FillInTheBlank" },
                new Questions { QuestionID = 11, QuestionText = "Which of the following is not a prime number?", QuestionType = "MultipleChoiceAndAnswers" },
                new Questions { QuestionID = 12, QuestionText = "Arrange the following cities in alphabetical order: Paris, New York, Tokyo, London", QuestionType = "Sorting" },
                new Questions { QuestionID = 13, QuestionText = "What is the sum of 2 + 2?", QuestionType = "MultipleChoice" },
                new Questions { QuestionID = 14, QuestionText = "True or False: The moon is made of cheese.", QuestionType = "TrueFalse" },
                new Questions { QuestionID = 15, QuestionText = "Fill in the blank: C# is a ______ programming language.", QuestionType = "FillInTheBlank" }
            );


            // Seed Answers for the MultipleChoice/True/False question
            modelBuilder.Entity<Choices>().HasData(
                // Choices for QuestionID 1 (MultipleChoice)
                new Choices { ChoiceID = 1, QuestionID = 1, ChoiceText = "Berlin" },
                new Choices { ChoiceID = 2, QuestionID = 1, ChoiceText = "Paris" },
                new Choices { ChoiceID = 3, QuestionID = 1, ChoiceText = "London" },
                new Choices { ChoiceID = 4, QuestionID = 1, ChoiceText = "Madrid" },

                // Choices for QuestionID 2 (MultipleChoiceAndAnswers)
                new Choices { ChoiceID = 5, QuestionID = 2, ChoiceText = "2" },
                new Choices { ChoiceID = 6, QuestionID = 2, ChoiceText = "5" },
                new Choices { ChoiceID = 7, QuestionID = 2, ChoiceText = "8" },
                new Choices { ChoiceID = 8, QuestionID = 2, ChoiceText = "11" },

                // Choices for QuestionID 3 (TrueFalse)
                new Choices { ChoiceID = 9, QuestionID = 3, ChoiceText = "True" },
                new Choices { ChoiceID = 10, QuestionID = 3, ChoiceText = "False" },

                // Choices for QuestionID 5 (Sorting)
                new Choices { ChoiceID = 12, QuestionID = 5, ChoiceText = "Linked List" },
                new Choices { ChoiceID = 13, QuestionID = 5, ChoiceText = "Binary Search Tree" },
                new Choices { ChoiceID = 14, QuestionID = 5, ChoiceText = "Hash Table" },
                new Choices { ChoiceID = 15, QuestionID = 5, ChoiceText = "Binary Search" },

                // Choices for QuestionID 6 (TrueFalse)
                new Choices { ChoiceID = 16, QuestionID = 6, ChoiceText = "True" },
                new Choices { ChoiceID = 17, QuestionID = 6, ChoiceText = "False" },

                // Choices for QuestionID 8 (MultipleChoice)
                new Choices { ChoiceID = 19, QuestionID = 8, ChoiceText = "Tokyo" },
                new Choices { ChoiceID = 20, QuestionID = 8, ChoiceText = "Beijing" },
                new Choices { ChoiceID = 21, QuestionID = 8, ChoiceText = "Seoul" },
                new Choices { ChoiceID = 22, QuestionID = 8, ChoiceText = "Bangkok" },

                // Choices for QuestionID 9 (Sorting)
                new Choices { ChoiceID = 23, QuestionID = 9, ChoiceText = "1" },
                new Choices { ChoiceID = 24, QuestionID = 9, ChoiceText = "2" },
                new Choices { ChoiceID = 25, QuestionID = 9, ChoiceText = "3" },
                new Choices { ChoiceID = 26, QuestionID = 9, ChoiceText = "4" },

                // Choices for QuestionID 11 (MultipleChoiceAndAnswers)
                new Choices { ChoiceID = 28, QuestionID = 11, ChoiceText = "4" },
                new Choices { ChoiceID = 29, QuestionID = 11, ChoiceText = "5" },
                new Choices { ChoiceID = 30, QuestionID = 11, ChoiceText = "6" },
                new Choices { ChoiceID = 31, QuestionID = 11, ChoiceText = "8" },

                // Choices for QuestionID 12 (Sorting)
                new Choices { ChoiceID = 32, QuestionID = 12, ChoiceText = "London" },
                new Choices { ChoiceID = 33, QuestionID = 12, ChoiceText = "New York" },
                new Choices { ChoiceID = 34, QuestionID = 12, ChoiceText = "Paris" },
                new Choices { ChoiceID = 35, QuestionID = 12, ChoiceText = "Tokyo" },

                // Choices for QuestionID 13 (MultipleChoice)
                new Choices { ChoiceID = 36, QuestionID = 13, ChoiceText = "4" },
                new Choices { ChoiceID = 37, QuestionID = 13, ChoiceText = "5" },
                new Choices { ChoiceID = 38, QuestionID = 13, ChoiceText = "6" },
                new Choices { ChoiceID = 39, QuestionID = 13, ChoiceText = "8" },

                // Choices for QuestionID 14 (TrueFalse)
                new Choices { ChoiceID = 40, QuestionID = 14, ChoiceText = "False" },
                new Choices { ChoiceID = 41, QuestionID = 14, ChoiceText = "True" }

            );

            modelBuilder.Entity<CorrectSorting>().HasData(
                // Answer for QuestionID 5 (Sorting)
                new CorrectSorting { CorrectSortingID = 1, QuestionID = 5, SortingOrder = 14131112, SortingScore = 15 },

                // Answer Sorting for QuestionID 9
                new CorrectSorting { CorrectSortingID = 2, QuestionID = 9, SortingOrder = 23242526, SortingScore = 10 },

                // Answer Sorting for QuestionID 12
                new CorrectSorting { CorrectSortingID = 3, QuestionID = 12, SortingOrder = 32333435, SortingScore = 12 }
                );

            modelBuilder.Entity<CorrectText>().HasData(
                // Answer for QuestionID 4 (FillInTheBlank)
                new CorrectText { CorrectTextID = 1, QuestionID = 4, CorrectTextAnswer = "1" , TextScore = 5 },

                // Answer for QuestionID 7 (FillInTheBlank)
                new CorrectText { CorrectTextID = 2, QuestionID = 7, CorrectTextAnswer = "299,792" , TextScore = 5 },

                // Answer for QuestionID 10 (FillInTheBlank)
                new CorrectText { CorrectTextID = 3, QuestionID = 10, CorrectTextAnswer = "East" , TextScore = 5 },

                // Answers for QuestionID 15 (FillInTheBlank)
                new CorrectText { CorrectTextID = 4, QuestionID = 15, CorrectTextAnswer = "object-oriented" , TextScore = 5 }

                );


            modelBuilder.Entity<ApplicationSettings>()
                .HasData(
                new ApplicationSettings { id = 1, LandingUrl = "Somelink will be here", SupportedFileTypes = "Pdf" });

       

        }

    } 
}

