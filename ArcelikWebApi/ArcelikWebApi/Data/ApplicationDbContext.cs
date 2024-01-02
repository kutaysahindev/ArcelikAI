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

        
        // DbSet for PdfEntity
        //public DbSet<PdfEntity> PdfEntities { get; set; }

        /*
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships
            modelBuilder.Entity<AiApplication>()
                .HasMany(a => a.Pdfs)
                .WithOne(p => p.AiApplication)
                .HasForeignKey(p => p.AiApplicationId);

            base.OnModelCreating(modelBuilder);
        }
        */
        
    }
}

