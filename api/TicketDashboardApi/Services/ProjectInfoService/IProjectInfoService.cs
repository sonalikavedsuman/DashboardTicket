using TicketDashboardApi.Dtos;
using TicketDashboardApi.Models;

namespace TicketDashboardApi.Services.ProjectInfoService
{
    public interface IProjectInfoService
    {
        Task<IEnumerable<ProjectInfo>> GetAllProjectInfosAsync();
        Task<ProjectInfo> GetProjectByIdAsync(Guid id);  // Changed to match implementation
        Task<IEnumerable<ProjectInfo>> GetProjectsByPersonalInfoIdAsync(Guid personalInfoId);  // Added this method
        Task<ProjectInfo> CreateProjectInfoAsync(ProjectInfoDto dto);
        Task<ProjectInfo> UpdateProjectInfoAsync(Guid id, ProjectInfoDto dto);
        Task<bool> DeleteProjectInfoAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
    }
}
