using Microsoft.EntityFrameworkCore;
using TicketDashboardApi.DataContext;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Models;

namespace TicketDashboardApi.Services.ProjectInfoService
{
    public class ProjectInfoService : IProjectInfoService
    {
        private readonly TicketDashboardDbContext _context;

        public ProjectInfoService(TicketDashboardDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProjectInfo>> GetAllProjectInfosAsync()
        {
            return await _context.ProjectInfos
                .Include(p => p.PersonalInfo)
                .ToListAsync();
        }

        public async Task<ProjectInfo> GetProjectByIdAsync(Guid id)  // Method name matches interface
        {
            return await _context.ProjectInfos
                .Include(p => p.PersonalInfo)
                .Include(p => p.ClientContents)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<ProjectInfo>> GetProjectsByPersonalInfoIdAsync(Guid personalInfoId)
        {
            return await _context.ProjectInfos
                .Where(p => p.PersonalInfoId == personalInfoId)
                .ToListAsync();
        }

        public async Task<ProjectInfo> CreateProjectInfoAsync(ProjectInfoDto dto)
        {
            var project = new ProjectInfo
            {
                Id = Guid.NewGuid(),  // Generate new GUID
                ProjectName = dto.ProjectName,
                Description = dto.Description,
                PersonalInfoId = dto.PersonalInfoId,
                CreatedAt = DateTime.UtcNow
            };

            _context.ProjectInfos.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<ProjectInfo> UpdateProjectInfoAsync(Guid id, ProjectInfoDto dto)
        {
            var project = await _context.ProjectInfos.FindAsync(id);
            if (project == null) return null;

            project.ProjectName = dto.ProjectName;
            project.Description = dto.Description;
            project.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<bool> DeleteProjectInfoAsync(Guid id)
        {
            var project = await _context.ProjectInfos.FindAsync(id);
            if (project == null) return false;

            _context.ProjectInfos.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.ProjectInfos.AnyAsync(p => p.Id == id);
        }
    }
}