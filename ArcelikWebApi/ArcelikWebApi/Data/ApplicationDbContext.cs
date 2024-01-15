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
        public DbSet<Video> Videos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .HasKey(u => new { u.id, u.Email });

            // Your other configurations...

            modelBuilder.Entity<WatchedVideo>()
                .HasOne(wv => wv.User)
                .WithMany(u => u.WatchedVideos)
                .HasForeignKey(wv => new { wv.Userid, wv.Email })
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);

            //Seed Video Data in DbContext:Seed your Video data in the ApplicationDbContext:

            //seeding Video data

            modelBuilder.Entity<Video>().HasData(
                new Video { Id = 1, Title = "Video 1", DurationInSeconds = 5, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample1.mp4" },
                new Video { Id = 2, Title = "Video 2", DurationInSeconds = 8, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4" },
                new Video { Id = 3, Title = "Video 3", DurationInSeconds = 10, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" }
            );

        }
    }
}

