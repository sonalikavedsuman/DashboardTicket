using TicketDashboardApi.Dtos;
using TicketDashboardApi.Models;

namespace TicketDashboardApi.Services.ClientContentService
{
    public interface IClientContentService
    {
        Task<IEnumerable<ClientContent>> GetAllClientContentsAsync();
        Task<ClientContent> GetClientContentByIdAsync(Guid id);
        Task<IEnumerable<ClientContent>> GetClientContentsByProjectIdAsync(Guid projectInfoId);
        Task<ClientContent> CreateClientContentAsync(ClientContentDto dto);
        Task<ClientContent> UpdateClientContentAsync(Guid id, ClientContentDto dto);
        Task<bool> DeleteClientContentAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
    }
}
