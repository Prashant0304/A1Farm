using FarmApi.Models.DTO;
using FarmApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

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

        [HttpPost("save-contract")]
        public async Task<IActionResult> Save([FromBody] dynamic model)
        {
            await _db.ExecuteAsync("SaveContract", model);
            return Ok();
        }

        [HttpGet("get-landid")]

        public async Task<IActionResult> GetLandIdByFarmerId(int farmerId)
        {
            var lands = await _db.QueryAsync<dynamic>(
                 "GetLandsByFarmerId",
                 new { FarmerId = farmerId });

            return Ok(lands);
        }
    }
}
