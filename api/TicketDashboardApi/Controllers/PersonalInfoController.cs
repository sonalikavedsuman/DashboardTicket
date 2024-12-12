using Microsoft.AspNetCore.Mvc;
using TicketDashboardApi.Dtos;
using TicketDashboardApi.Services.PersonalInfoService;

namespace TicketDashboardApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalInfoController : ControllerBase
    {
        private readonly IPersonalInfoService _personalInfoService;

        public PersonalInfoController(IPersonalInfoService personalInfoService)
        {
            _personalInfoService = personalInfoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var personalInfos = await _personalInfoService.GetAllPersonalInfosAsync();
            return Ok(personalInfos);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var personalInfo = await _personalInfoService.GetPersonalInfoByIdAsync(id);
            if (personalInfo == null)
                return NotFound();

            return Ok(personalInfo);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PersonalInfoDto dto)
        {
            var createdPersonalInfo = await _personalInfoService.CreatePersonalInfoAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdPersonalInfo.Id }, createdPersonalInfo);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, PersonalInfoDto dto)
        {
            var updatedPersonalInfo = await _personalInfoService.UpdatePersonalInfoAsync(id, dto);
            if (updatedPersonalInfo == null)
                return NotFound();

            return Ok(updatedPersonalInfo);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _personalInfoService.DeletePersonalInfoAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}