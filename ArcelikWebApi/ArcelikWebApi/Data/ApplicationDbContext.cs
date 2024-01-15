using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;

namespace ArcelikWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // DbSet for Tables
        public DbSet<AiApplication> AiApplications { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<WatchedVideo> WatchedVideo { get; set; }
        public DbSet<Video> Videos { get; set; }

        //Seed Video Data in DbContext:Seed your Video data in the ApplicationDbContext:
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed Video data
            modelBuilder.Entity<Video>().HasData(
                new Video { Id = 1, Title = "Video 1", DurationInSeconds = 5, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample1.mp4" },
                new Video { Id = 2, Title = "Video 2", DurationInSeconds = 420, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4" },
                new Video { Id = 3, Title = "Video 3", DurationInSeconds = 240, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" }
            );

        }
    }
}

