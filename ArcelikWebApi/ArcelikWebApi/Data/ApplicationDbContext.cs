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
        public DbSet<UserVideo> UserVideo { get; set; }
        public DbSet<Video> Videos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the many-to-many relationship
            modelBuilder.Entity<UserVideo>()
                .HasKey(uv => new { uv.Userid, uv.VideoId });

            // Your other configurations...

            modelBuilder.Entity<UserVideo>()
                .HasOne(uv => uv.User)
                .WithMany(u => u.WatchedVideos)
                .HasForeignKey(uv => uv.Userid);

            modelBuilder.Entity<UserVideo>()
                .HasOne(uv => uv.Video)
                .WithMany(v => v.UsersWhoWatched) 
                .HasForeignKey(uv => uv.VideoId);

            base.OnModelCreating(modelBuilder);

            //Seed Video Data in DbContext:Seed your Video data in the ApplicationDbContext:

            //seeding Video data

            modelBuilder.Entity<Video>().HasData(
                new Video { Id = 1, Title = "Video 1", VideoDuration = 5, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample1.mp4" },
                new Video { Id = 2, Title = "Video 2", VideoDuration = 8, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample2.mp4" },
                new Video { Id = 3, Title = "Video 3", VideoDuration = 10, BlobStorageUrl = "https://arcelikstorage.blob.core.windows.net/videos/sample3.mp4" }
            );

        }
    }
}

