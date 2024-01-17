using System;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .HasOne(u => u.WatchedVideo)
                .WithMany()
                .HasForeignKey(u => u.WatchedVideoId);

            modelBuilder.Entity<Video>().HasData(
                new Video { Id = 1, Title = "Video 1", VideoDuration = 5, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample1.mp4" },
                new Video { Id = 2, Title = "Video 2", VideoDuration = 8, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4" },
                new Video { Id = 3, Title = "Video 3", VideoDuration = 10, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" }
            );

            modelBuilder.Entity<ApplicationSettings>()
                .HasData(
                new ApplicationSettings { id = 1, LandingUrl = "Somelink will be here", SupportedFileTypes = "Pdf" });

       

        }

    } 
}

