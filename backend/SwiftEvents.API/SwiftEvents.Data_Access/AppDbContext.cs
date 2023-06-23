using Microsoft.EntityFrameworkCore;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Data_Access
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(x => x.Events)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId);
            modelBuilder.Entity<User>()
                .HasIndex(b => b.Mail)
                .IsUnique();
            modelBuilder.Entity<Event>()
                .HasMany(x => x.Guests)
                .WithOne(x => x.Event)
                .HasForeignKey(x => x.EventId);
            modelBuilder.Entity<Event>()
                .HasMany(x => x.Tables)
                .WithOne(x => x.Event)
                .HasForeignKey(x => x.EventId);
            modelBuilder.Entity<Table>()
                .HasMany(x => x.Guests)
                .WithOne(x => x.Table)
                .HasForeignKey(x => x.TableId)
                .IsRequired(false);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<Table> Tables { get; set; }
        public DbSet<UploadedFile> UploadedFiles { get; set; }

    }
}
