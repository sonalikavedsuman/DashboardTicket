using Microsoft.AspNetCore.Mvc;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Services.ClientContentService;

namespace TicketDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientContentController : ControllerBase
    {
        private readonly IClientContentService _clientContentService;

        public ClientContentController(IClientContentService clientContentService)
        {
            _clientContentService = clientContentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contents = await _clientContentService.GetAllClientContentsAsync();
            return Ok(contents);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var content = await _clientContentService.GetClientContentByIdAsync(id);
            if (content == null)
                return NotFound();

            return Ok(content);
        }

        [HttpGet("project/{projectInfoId}")]
        public async Task<IActionResult> GetByProjectId(Guid projectInfoId)
        {
            var contents = await _clientContentService.GetClientContentsByProjectIdAsync(projectInfoId);
            return Ok(contents);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ClientContentDto dto)
        {
            var createdContent = await _clientContentService.CreateClientContentAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdContent.Id }, createdContent);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, ClientContentDto dto)
        {
            var updatedContent = await _clientContentService.UpdateClientContentAsync(id, dto);
            if (updatedContent == null)
                return NotFound();

            return Ok(updatedContent);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _clientContentService.DeleteClientContentAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}