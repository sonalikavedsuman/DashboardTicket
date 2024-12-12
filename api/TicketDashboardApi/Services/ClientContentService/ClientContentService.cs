using Microsoft.EntityFrameworkCore;
using TicketDashboardApi.DataContext;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Models;
using TicketDashboardApi.Services.ClientContentService;

public class ClientContentService : IClientContentService
{
    private readonly TicketDashboardDbContext _context;

    public ClientContentService(TicketDashboardDbContext context)
    {
        _context = context;
    }


    public async Task<IEnumerable<ClientContent>> GetAllClientContentsAsync()
    {
        return await _context.ClientContents
            .Include(c => c.ProjectInfo)
            .ToListAsync();
    }

    public async Task<ClientContent> GetClientContentByIdAsync(Guid id)
    {
        return await _context.ClientContents
            .Include(c => c.ProjectInfo)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<ClientContent>> GetClientContentsByProjectIdAsync(Guid projectInfoId)
    {
        return await _context.ClientContents
            .Where(c => c.ProjectInfoId == projectInfoId)
            .ToListAsync();
    }

    public async Task<ClientContent> CreateClientContentAsync(ClientContentDto dto)
    {
        var clientContent = new ClientContent
        {
            Id = Guid.NewGuid(),  // Generate new GUID
            ShortName = dto.ShortName,
            DetailName = dto.DetailName,
            ClientProjectNumber = dto.ClientProjectNumber,
            ProjectInfoId = dto.ProjectInfoId,
            CreatedAt = DateTime.UtcNow
        };

        _context.ClientContents.Add(clientContent);
        await _context.SaveChangesAsync();
        return clientContent;
    }

    public async Task<ClientContent> UpdateClientContentAsync(Guid id, ClientContentDto dto)
    {
        var clientContent = await _context.ClientContents.FindAsync(id);
        if (clientContent == null) return null;

        clientContent.ShortName = dto.ShortName;
        clientContent.DetailName = dto.DetailName;
        clientContent.ClientProjectNumber = dto.ClientProjectNumber;
        clientContent.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return clientContent;
    }

    public async Task<bool> DeleteClientContentAsync(Guid id)
    {
        var clientContent = await _context.ClientContents.FindAsync(id);
        if (clientContent == null) return false;

        _context.ClientContents.Remove(clientContent);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.ClientContents.AnyAsync(c => c.Id == id);
    }
}