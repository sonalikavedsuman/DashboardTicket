using TicketDashboardApi.Dtos;
using TicketDashboardApi.Models;

namespace TicketDashboardApi.Services.PersonalInfoService
{
    public interface IPersonalInfoService
    {
        Task<IEnumerable<PersonalInfo>> GetAllPersonalInfosAsync();
        Task<PersonalInfo> GetPersonalInfoByIdAsync(Guid id);
        Task<PersonalInfo> CreatePersonalInfoAsync(PersonalInfoDto dto);
        Task<PersonalInfo> UpdatePersonalInfoAsync(Guid id, PersonalInfoDto dto);
        Task<bool> DeletePersonalInfoAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
    }
}
