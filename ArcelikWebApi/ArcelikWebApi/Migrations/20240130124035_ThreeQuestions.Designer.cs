﻿// <auto-generated />
using System;
using ArcelikWebApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ArcelikWebApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240130124035_ThreeQuestions")]
    partial class ThreeQuestions
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ArcelikWebApi.Models.AiApplication", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AppName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ConversationRetentionPeriod")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EnableUploadPdfFile")
                        .HasColumnType("bit");

                    b.Property<float>("ModalTemperature")
                        .HasColumnType("real");

                    b.Property<string>("Pdfs_Urls")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SelectedModel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SystemPrompt")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("UseKnowledgebase")
                        .HasColumnType("bit");

                    b.Property<string>("WelcomeMessage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("AiApplications");
                });

            modelBuilder.Entity("ArcelikWebApi.Models.ApplicationSettings", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("LandingUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SupportedFileTypes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("ApplicationSettings");

                    b.HasData(
                        new
                        {
                            id = 1,
                            LandingUrl = "Somelink will be here",
                            SupportedFileTypes = "Pdf"
                        });
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Quiz.Choices", b =>
                {
                    b.Property<int>("ChoiceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ChoiceID"));

                    b.Property<string>("ChoiceText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuestionID")
                        .HasColumnType("int");

                    b.HasKey("ChoiceID");

                    b.HasIndex("QuestionID");

                    b.ToTable("Choices");

                    b.HasData(
                        new
                        {
                            ChoiceID = 1,
                            ChoiceText = "Berlin",
                            QuestionID = 1
                        },
                        new
                        {
                            ChoiceID = 2,
                            ChoiceText = "Paris",
                            QuestionID = 1
                        },
                        new
                        {
                            ChoiceID = 3,
                            ChoiceText = "London",
                            QuestionID = 1
                        },
                        new
                        {
                            ChoiceID = 4,
                            ChoiceText = "Madrid",
                            QuestionID = 1
                        },
                        new
                        {
                            ChoiceID = 5,
                            ChoiceText = "2",
                            QuestionID = 2
                        },
                        new
                        {
                            ChoiceID = 6,
                            ChoiceText = "5",
                            QuestionID = 2
                        },
                        new
                        {
                            ChoiceID = 7,
                            ChoiceText = "8",
                            QuestionID = 2
                        },
                        new
                        {
                            ChoiceID = 8,
                            ChoiceText = "11",
                            QuestionID = 2
                        },
                        new
                        {
                            ChoiceID = 9,
                            ChoiceText = "True",
                            QuestionID = 3
                        },
                        new
                        {
                            ChoiceID = 10,
                            ChoiceText = "False",
                            QuestionID = 3
                        });
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Quiz.CorrectChoices", b =>
                {
                    b.Property<int>("CorrectChoiceID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CorrectChoiceID"));

                    b.Property<int>("ChoiceID")
                        .HasColumnType("int");

                    b.Property<int>("PartialScore")
                        .HasColumnType("int");

                    b.Property<int>("QuestionID")
                        .HasColumnType("int");

                    b.HasKey("CorrectChoiceID");

                    b.HasIndex("ChoiceID")
                        .IsUnique();

                    b.HasIndex("QuestionID");

                    b.ToTable("CorrectChoices");

                    b.HasData(
                        new
                        {
                            CorrectChoiceID = 1,
                            ChoiceID = 2,
                            PartialScore = 10,
                            QuestionID = 1
                        },
                        new
                        {
                            CorrectChoiceID = 2,
                            ChoiceID = 5,
                            PartialScore = 1,
                            QuestionID = 2
                        },
                        new
                        {
                            CorrectChoiceID = 3,
                            ChoiceID = 6,
                            PartialScore = 1,
                            QuestionID = 2
                        },
                        new
                        {
                            CorrectChoiceID = 4,
                            ChoiceID = 8,
                            PartialScore = 1,
                            QuestionID = 2
                        },
                        new
                        {
                            CorrectChoiceID = 5,
                            ChoiceID = 9,
                            PartialScore = 10,
                            QuestionID = 3
                        });
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Quiz.Questions", b =>
                {
                    b.Property<int>("QuestionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("QuestionID"));

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QuestionType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("QuestionID");

                    b.ToTable("Questions");

                    b.HasData(
                        new
                        {
                            QuestionID = 1,
                            QuestionText = "What is the capital of France?",
                            QuestionType = "MultipleChoice"
                        },
                        new
                        {
                            QuestionID = 2,
                            QuestionText = "Which of the following are prime numbers?",
                            QuestionType = "MultipleChoiceAndAnswers"
                        },
                        new
                        {
                            QuestionID = 3,
                            QuestionText = "Is the sky blue?",
                            QuestionType = "TrueFalse"
                        });
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Users", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SecondsSpendOnQuiz")
                        .HasColumnType("int");

                    b.Property<int>("WatchedTimeInSeconds")
                        .HasColumnType("int");

                    b.Property<int>("WatchedVideoId")
                        .HasColumnType("int");

                    b.Property<bool>("isTutorialDone")
                        .HasColumnType("bit");

                    b.Property<bool>("isWatchedAll")
                        .HasColumnType("bit");

                    b.Property<int>("quizPoint")
                        .HasColumnType("int");

                    b.HasKey("id");

                    b.HasIndex("WatchedVideoId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Video", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BlobStorageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VideoDuration")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Videos");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample1.mp4",
                            Title = "Video 1",
                            VideoDuration = 5
                        },
                        new
                        {
                            Id = 2,
                            BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4",
                            Title = "Video 2",
                            VideoDuration = 8
                        },
                        new
                        {
                            Id = 3,
                            BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4",
                            Title = "Video 3",
                            VideoDuration = 10
                        });
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Quiz.Choices", b =>
                {
                    b.HasOne("ArcelikWebApi.Models.Quiz.Questions", "Questions")
                        .WithMany("Choices")
                        .HasForeignKey("QuestionID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Quiz.CorrectChoices", b =>
                {
                    b.HasOne("ArcelikWebApi.Models.Quiz.Choices", "Choices")
                        .WithOne("CorrectChoices")
                        .HasForeignKey("ArcelikWebApi.Models.Quiz.CorrectChoices", "ChoiceID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ArcelikWebApi.Models.Quiz.Questions", "Questions")
                        .WithMany("CorrectChoices")
                        .HasForeignKey("QuestionID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Choices");

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Users", b =>
                {
                    b.HasOne("ArcelikWebApi.Models.Video", "WatchedVideo")
                        .WithMany()
                        .HasForeignKey("WatchedVideoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WatchedVideo");
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Quiz.Choices", b =>
                {
                    b.Navigation("CorrectChoices")
                        .IsRequired();
                });

            modelBuilder.Entity("ArcelikWebApi.Models.Quiz.Questions", b =>
                {
                    b.Navigation("Choices");

                    b.Navigation("CorrectChoices");
                });
#pragma warning restore 612, 618
        }
    }
}
