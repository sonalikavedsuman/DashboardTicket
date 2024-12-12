using Microsoft.AspNetCore.Mvc;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Services.DocumentEditorService;

namespace TicketDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentEditorController : ControllerBase
    {
        private readonly IDocumentEditorService _documentEditorService;

        public DocumentEditorController(IDocumentEditorService documentEditorService)
        {
            _documentEditorService = documentEditorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var documents = await _documentEditorService.GetAllDocumentEditorsAsync();
            return Ok(documents);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var document = await _documentEditorService.GetDocumentEditorByIdAsync(id);
            if (document == null)
                return NotFound();

            return Ok(document);
        }

        [HttpPost]
        public async Task<IActionResult> Create(DocumentEditorDto dto)
        {
            var createdDocument = await _documentEditorService.CreateDocumentEditorAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdDocument.Id }, createdDocument);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, DocumentEditorDto dto)
        {
            var updatedDocument = await _documentEditorService.UpdateDocumentEditorAsync(id, dto);
            if (updatedDocument == null)
                return NotFound();

            return Ok(updatedDocument);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _documentEditorService.DeleteDocumentEditorAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}