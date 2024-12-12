using System.Reflection.Metadata;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Models;

namespace TicketDashboardApi.Services.DocumentEditorService
{
    public interface IDocumentEditorService
    {
        Task<IEnumerable<DocumentEditor>> GetAllDocumentEditorsAsync();
        Task<DocumentEditor> GetDocumentEditorByIdAsync(Guid id);
        Task<DocumentEditor> CreateDocumentEditorAsync(DocumentEditorDto dto);
        Task<DocumentEditor> UpdateDocumentEditorAsync(Guid id, DocumentEditorDto dto);
        Task<bool> DeleteDocumentEditorAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
    }
}
