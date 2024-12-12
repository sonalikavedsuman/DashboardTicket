using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using TicketDashboardApi.DataContext;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Models;
using TicketDashboardApi.Services.DocumentEditorService;

public class DocumentEditorService : IDocumentEditorService
{
    private readonly TicketDashboardDbContext _context;

    public DocumentEditorService(TicketDashboardDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DocumentEditor>> GetAllDocumentEditorsAsync()
    {
        return await _context.DocumentEditors
            .Include(d => d.PersonalInfo)
            .Include(d => d.ProjectInfo)
            .Include(d => d.ClientContent)
            .ToListAsync();
    }

    public async Task<DocumentEditor> GetDocumentEditorByIdAsync(Guid id)
    {
        return await _context.DocumentEditors
            .Include(d => d.PersonalInfo)
            .Include(d => d.ProjectInfo)
            .Include(d => d.ClientContent)
            .FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<DocumentEditor> CreateDocumentEditorAsync(DocumentEditorDto dto)
    {
        var document = new DocumentEditor
        {
            Id = Guid.NewGuid(),  // Generate new GUID
            PersonalInfoId = dto.PersonalInfoId,
            ProjectInfoId = dto.ProjectInfoId,
            ClientContentId = dto.ClientContentId,
            CreatedAt = DateTime.UtcNow
        };

        _context.DocumentEditors.Add(document);
        await _context.SaveChangesAsync();
        return document;
    }

    public async Task<DocumentEditor> UpdateDocumentEditorAsync(Guid id, DocumentEditorDto dto)
    {
        var document = await _context.DocumentEditors.FindAsync(id);
        if (document == null) return null;

        document.PersonalInfoId = dto.PersonalInfoId;
        document.ProjectInfoId = dto.ProjectInfoId;
        document.ClientContentId = dto.ClientContentId;
        document.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return document;
    }

    public async Task<bool> DeleteDocumentEditorAsync(Guid id)
    {
        var document = await _context.DocumentEditors.FindAsync(id);
        if (document == null) return false;

        _context.DocumentEditors.Remove(document);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.DocumentEditors.AnyAsync(d => d.Id == id);
    }
}