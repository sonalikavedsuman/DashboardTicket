using Microsoft.EntityFrameworkCore;
using TicketDashboardApi.DataContext;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Models;

namespace TicketDashboardApi.Services.PersonalInfoService
{
    public class PersonalInfoService : IPersonalInfoService
    {
        private readonly TicketDashboardDbContext _context;

        public PersonalInfoService(TicketDashboardDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PersonalInfo>> GetAllPersonalInfosAsync()
        {
            return await _context.PersonalInfos.ToListAsync();
        }

        public async Task<PersonalInfo> GetPersonalInfoByIdAsync(Guid id)
        {
            return await _context.PersonalInfos
                .Include(p => p.ProjectInfos)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<PersonalInfo> CreatePersonalInfoAsync(PersonalInfoDto dto)
        {
            var personalInfo = new PersonalInfo
            {
                Id = Guid.NewGuid(),  // Generate new GUID
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Address = dto.Address,
                CreatedAt = DateTime.UtcNow
            };

            _context.PersonalInfos.Add(personalInfo);
            await _context.SaveChangesAsync();
            return personalInfo;
        }

        public async Task<PersonalInfo> UpdatePersonalInfoAsync(Guid id, PersonalInfoDto dto)
        {
            var personalInfo = await _context.PersonalInfos.FindAsync(id);
            if (personalInfo == null) return null;

            personalInfo.FullName = dto.FullName;
            personalInfo.Email = dto.Email;
            personalInfo.Phone = dto.Phone;
            personalInfo.Address = dto.Address;
            personalInfo.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return personalInfo;
        }

        public async Task<bool> DeletePersonalInfoAsync(Guid id)
        {
            var personalInfo = await _context.PersonalInfos.FindAsync(id);
            if (personalInfo == null) return false;

            _context.PersonalInfos.Remove(personalInfo);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.PersonalInfos.AnyAsync(p => p.Id == id);
        }
    }
}
