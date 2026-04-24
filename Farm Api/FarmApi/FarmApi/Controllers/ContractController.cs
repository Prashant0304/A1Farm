using FarmApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FarmApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly DbService _db;

        public ContractController(DbService db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string lang = "en", int pageNumber = 1, int pageSize = 10)
        {
            var (data, total) = await _db.QueryPagedAsync<dynamic>(
                "GetContracts",
                new { LanguageCode = lang, PageNumber = pageNumber, PageSize = pageSize });

            return Ok(new { data, total });
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] dynamic model)
        {
            await _db.ExecuteAsync("SaveContract", model);
            return Ok();
        }
    }
}
