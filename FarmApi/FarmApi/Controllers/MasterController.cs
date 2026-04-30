using FarmApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

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

        [HttpGet("states")]
        public async Task<IActionResult> GetStates()
        {
            var data = await _db.QueryAsync<dynamic>("GetAllStates");
            return Ok(data);
        }

        [HttpGet("districts/{stateId}")]
        public async Task<IActionResult> GetDistricts(int stateId)
        {
            var data = await _db.QueryAsync<dynamic>(
                "GetDistrictByState",
                new { StateId = stateId }
            );

            return Ok(data);
        }

    }
    }
