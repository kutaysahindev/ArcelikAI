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
        public DbSet<Users> Users { get; set; }
        public DbSet<WatchedVideo> WatchedVideo { get; set; }
        public DbSet<Videos> Videos { get; set; }

    }
    //Seed Video Data in DbContext:Seed your Video data in the ApplicationDbContext:

    public DbSet<Videos> Videos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Video>().HasData(
        new Video { Id = 1, Title = "Video 1", DurationInSeconds = 300, BlobStorageUrl = "your_blob_storage_url_1" },
        new Video { Id = 2, Title = "Video 2", DurationInSeconds = 420, BlobStorageUrl = "your_blob_storage_url_2" },
            new Video { Id = 3, Title = "Video 3", DurationInSeconds = 240, BlobStorageUrl = "your_blob_storage_url_3" }
        );
    }
}

