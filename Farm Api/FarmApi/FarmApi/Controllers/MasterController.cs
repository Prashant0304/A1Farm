using FarmApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FarmApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        private readonly DbService _db;

        public MasterController(DbService db)
        {
            _db = db;
        }

        [HttpGet("languages")]
        public async Task<IActionResult> GetLanguages()
        {
            var data = await _db.QueryAsync<dynamic>("GetLanguages");
            return Ok(data);
        }

        [HttpGet("translations")]
        public async Task<IActionResult> GetTranslations(string lang)
        {
            var data = await _db.QueryAsync<dynamic>("GetTranslations", new { LanguageCode = lang });
            return Ok(data);
        }

        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var data = await _db.QueryAsync<dynamic>("GetRoles");
            return Ok(data);
        }
    }
}
