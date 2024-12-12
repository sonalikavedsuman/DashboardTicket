using Microsoft.EntityFrameworkCore;
using TicketDashboardApi.Models;

namespace TicketDashboardApi.DataContext
{
    public class TicketDashboardDbContext : DbContext
    {
        public TicketDashboardDbContext(DbContextOptions<TicketDashboardDbContext> options) : base(options)
        {
        }

        public DbSet<PersonalInfo> PersonalInfos { get; set; }
        public DbSet<ProjectInfo> ProjectInfos { get; set; }
        public DbSet<ClientContent> ClientContents { get; set; }
        public DbSet<DocumentEditor> DocumentEditors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure all entities to use UUID
            modelBuilder.Entity<PersonalInfo>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("uuid")
                    .HasDefaultValueSql("gen_random_uuid()");
            });

            modelBuilder.Entity<PersonalInfo>(entity =>
            {
                entity.ToTable("PersonalInfos");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                    .HasColumnType("uuid")
                    .HasDefaultValueSql("gen_random_uuid()");
            });

            // Configure ProjectInfo
            modelBuilder.Entity<ProjectInfo>(entity =>
            {
                entity.ToTable("ProjectInfos");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                    .HasColumnType("uuid")
                    .HasDefaultValueSql("gen_random_uuid()");
                entity.Property(e => e.PersonalInfoId)
                    .HasColumnType("uuid");

                entity.HasOne(d => d.PersonalInfo)
                    .WithMany(p => p.ProjectInfos)
                    .HasForeignKey(d => d.PersonalInfoId);
            });

            // Configure ClientContent
            modelBuilder.Entity<ClientContent>(entity =>
            {
                entity.ToTable("ClientContents");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                    .HasColumnType("uuid")
                    .HasDefaultValueSql("gen_random_uuid()");
                entity.Property(e => e.ProjectInfoId)
                    .HasColumnType("uuid");

                entity.HasOne(d => d.ProjectInfo)
                    .WithMany(p => p.ClientContents)
                    .HasForeignKey(d => d.ProjectInfoId);
            });

            // Configure DocumentEditor
            modelBuilder.Entity<DocumentEditor>(entity =>
            {
                entity.ToTable("DocumentEditors");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                    .HasColumnType("uuid")
                    .HasDefaultValueSql("gen_random_uuid()");
                entity.Property(e => e.PersonalInfoId)
                    .HasColumnType("uuid");
                entity.Property(e => e.ProjectInfoId)
                    .HasColumnType("uuid");
                entity.Property(e => e.ClientContentId)
                    .HasColumnType("uuid");
            });
        }
    }
}
