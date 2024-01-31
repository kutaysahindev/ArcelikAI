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
        public DbSet<CorrectChoices> CorrectChoices { get; set; }
        public DbSet<Choices> Choices { get; set; }   
        public DbSet<Questions> Questions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .HasOne(u => u.WatchedVideo)
                .WithMany()
                .HasForeignKey(u => u.WatchedVideoId);

            modelBuilder.Entity<Choices>()
                 .HasOne(q => q.Questions)
                 .WithMany(c => c.Choices)
                 .HasForeignKey(q => q.QuestionID) //sonra bi bak ögren parametrelere
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CorrectChoices>()
               .HasOne(q => q.Questions)
               .WithMany(a => a.CorrectChoices)
               .HasForeignKey(q => q.QuestionID)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CorrectChoices>()
                .HasOne(c => c.Choices)
                .WithOne(a => a.CorrectChoices)
                .HasForeignKey<CorrectChoices>(c => c.ChoiceID)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Video>().HasData(
                new Video { Id = 1, Title = "Video 1", VideoDuration = 5, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample1.mp4" },
                new Video { Id = 2, Title = "Video 2", VideoDuration = 8, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4" },
                new Video { Id = 3, Title = "Video 3", VideoDuration = 10, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" }
            );

            modelBuilder.Entity<Questions>().HasData(
               new Questions
               {
                   QuestionID = 1,
                   QuestionText = "What is the capital of France?",
                   QuestionType = "MultipleChoice"
               }
           );

            // Seed Choices for the first question
            modelBuilder.Entity<Choices>().HasData(
                new Choices { ChoiceID = 1, QuestionID = 1, ChoiceText = "Berlin" },
                new Choices { ChoiceID = 2, QuestionID = 1, ChoiceText = "Paris" },
                new Choices { ChoiceID = 3, QuestionID = 1, ChoiceText = "London" },
                new Choices { ChoiceID = 4, QuestionID = 1, ChoiceText = "Madrid" }
            );

            // Seed Answers for the first question
            modelBuilder.Entity<CorrectChoices>().HasData(
                new CorrectChoices { CorrectChoiceID = 1, QuestionID = 1, ChoiceID = 2, PartialScore = 10 }

            );

            // Seed Questions
            modelBuilder.Entity<Questions>().HasData(
                new Questions
                {
                    QuestionID = 2,
                    QuestionText = "Which of the following are prime numbers?",
                    QuestionType = "MultipleChoiceAndAnswers"
                }
            );

            // Seed Choices for the first question
            modelBuilder.Entity<Choices>().HasData(
                new Choices { ChoiceID = 5, QuestionID = 2, ChoiceText = "2" },
                new Choices { ChoiceID = 6, QuestionID = 2, ChoiceText = "5" },
                new Choices { ChoiceID = 7, QuestionID = 2, ChoiceText = "8" },
                new Choices { ChoiceID = 8, QuestionID = 2, ChoiceText = "11" }
            );

            // Seed Answers for the first question (multiple correct answers)
            modelBuilder.Entity<CorrectChoices>().HasData(
                new CorrectChoices { CorrectChoiceID = 2, QuestionID = 2, ChoiceID = 5, PartialScore = 1 },
                new CorrectChoices { CorrectChoiceID = 3, QuestionID = 2, ChoiceID = 6, PartialScore = 1 },
                new CorrectChoices { CorrectChoiceID = 4, QuestionID = 2, ChoiceID = 8, PartialScore = 1 }
            );

            // Seed Questions True/False
            modelBuilder.Entity<Questions>().HasData(
                new Questions
                {
                    QuestionID = 3,
                    QuestionText = "Is the sky blue?",
                    QuestionType = "TrueFalse"
                }
            );

            // Seed Choices for the True/False question
            modelBuilder.Entity<Choices>().HasData(
                new Choices { ChoiceID = 9, QuestionID = 3, ChoiceText = "True" },
                new Choices { ChoiceID = 10, QuestionID = 3, ChoiceText = "False" }
            );

            // Seed Answers for the True/False question
            modelBuilder.Entity<CorrectChoices>().HasData(
                new CorrectChoices { CorrectChoiceID = 5, QuestionID = 3, ChoiceID = 9, PartialScore = 10 }
            );

            /*

            modelBuilder.Entity<Questions>().HasData(
                new Questions
                {
                    QuestionID = 4,
                    QuestionText = "Banana",
                    QuestionType = "Matching"
                }
            );

            modelBuilder.Entity<Questions>().HasData(
                new Questions
                {
                    QuestionID = 5,
                    QuestionText = "Carrot",
                    QuestionType = "Matching"
                }
            );

            modelBuilder.Entity<Questions>().HasData(
                new Questions
                {
                    QuestionID = 6,
                    QuestionText = "Watermelon",
                    QuestionType = "Matching"
                }
            );

            modelBuilder.Entity<Questions>().HasData(
                new Questions
                {
                    QuestionID = 7,
                    QuestionText = "Coconut",
                    QuestionType = "Matching"
                }
            );

            // Seed Choices for the True/False question
            modelBuilder.Entity<Choices>().HasData(
                new Choices { ChoiceID = 10, QuestionID = 4, ChoiceText = "Yellow" },
                new Choices { ChoiceID = 11, QuestionID = 4, ChoiceText = "Orange" },
                new Choices { ChoiceID = 12, QuestionID = 4, ChoiceText = "Red" },
                new Choices { ChoiceID = 13, QuestionID = 4, ChoiceText = "False" }
            );

            */

            // Add more questions, choices, and answers as needed...

            modelBuilder.Entity<ApplicationSettings>()
                .HasData(
                new ApplicationSettings { id = 1, LandingUrl = "Somelink will be here", SupportedFileTypes = "Pdf" });

       

        }

    } 
}

