using Microsoft.AspNetCore.Mvc;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Services.ProjectInfoService;

namespace TicketDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectInfoController : ControllerBase
    {
        private readonly IProjectInfoService _projectInfoService;

        public ProjectInfoController(IProjectInfoService projectInfoService)
        {
            _projectInfoService = projectInfoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _projectInfoService.GetAllProjectInfosAsync();
            return Ok(projects);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var project = await _projectInfoService.GetProjectByIdAsync(id);
            if (project == null)
                return NotFound();

            return Ok(project);
        }

        [HttpGet("personal-info/{personalInfoId}")]
        public async Task<IActionResult> GetByPersonalInfoId(Guid personalInfoId)
        {
            var projects = await _projectInfoService.GetProjectsByPersonalInfoIdAsync(personalInfoId);
            return Ok(projects);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProjectInfoDto dto)
        {
            var createdProject = await _projectInfoService.CreateProjectInfoAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdProject.Id }, createdProject);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, ProjectInfoDto dto)
        {
            var updatedProject = await _projectInfoService.UpdateProjectInfoAsync(id, dto);
            if (updatedProject == null)
                return NotFound();

            return Ok(updatedProject);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _projectInfoService.DeleteProjectInfoAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}