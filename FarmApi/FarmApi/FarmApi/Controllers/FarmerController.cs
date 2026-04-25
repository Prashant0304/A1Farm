using FarmApi.Models.DTO;
using FarmApi.Models.Request;
using FarmApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FarmApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FarmerController : ControllerBase
    {
        private readonly DbService _db;

        public FarmerController(DbService db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int pageNumber = 1, int pageSize = 10)
        {
            var (data, total) = await _db.QueryPagedAsync<dynamic>(
                "GetFarmers",
                new { PageNumber = pageNumber, PageSize = pageSize });

            return Ok(new { data, total });
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string search, int pageNumber = 1, int pageSize = 10)
        {
            var (data, total) = await _db.QueryPagedAsync<dynamic>(
                "SearchFarmers",
                new { Search = search, PageNumber = pageNumber, PageSize = pageSize });

            return Ok(new { data, total });
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] dynamic model)
        {
            await _db.ExecuteAsync("SaveFarmer", model);
            return Ok();
        }

        [HttpGet("by-phone")]
        public async Task<IActionResult> GetByPhone(string phone)
        {
            var result = await _db.QueryAsync<FarmerWithLandDto>(
                "GetFarmerByPhone",
                new { Phone = phone }
            );

            var farmer = result.FirstOrDefault();

            if (farmer == null)
                return NotFound(new { message = "Farmer not found" });

            return Ok(farmer);
        }

        [HttpPost("save-with-land")]
        public async Task<IActionResult> SaveWithLand([FromBody] SaveFarmerWithLandRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Phone))
                return BadRequest(new { message = "Phone is required" });

            var result = await _db.QueryAsync<dynamic>(
                "SaveFarmerWithLand",
                new
                {
                    req.FarmerId,
                    req.Name,
                    req.Phone,
                    req.Village,
                    req.District,
                    req.State,
                    req.LandSize,

                    req.LandId,
                    Location = req.Location,
                    req.SoilType,
                    req.WaterSource,

                    UserId = req.UserId
                }
            );

            var farmerId = result.FirstOrDefault()?.FarmerId;

            return Ok(new
            {
                message = "Saved successfully",
                farmerId = farmerId
            });
        }
    }
}
