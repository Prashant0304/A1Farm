using FarmApi.Models.DTO;
using FarmApi.Models.Request;
using FarmApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace FarmApi.Controllers
{
    [Route("api/[controller]")]
 //   [ApiController]
    public class FarmerController : ControllerBase
    {
        private readonly DbService _db;

        public FarmerController(DbService db)
        {
            _db = db;
        }

      
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Farmer model)
        {
            try
            {
                var result = await _db.QueryAsync<dynamic>(
                    "SaveFarmer",
                    model
                );

                var farmerId = result.FirstOrDefault()?.FarmerId;

                return Ok(new
                {
                    message = "Farmer saved successfully",
                    farmerId = farmerId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insertlanddetails")]
        public async Task<IActionResult> InsertLandDetails([FromBody] FarmerLand model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var parameters = new
            {
                FarmerId = model.FarmerId,
                LandLocation = model.LandLocation,
                SoilType = model.SoilType,
                WaterSource = model.WaterSource,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                CreatedBy = model.UserId??(object)DBNull.Value
            };

            var result = await _db.QueryAsync<int>(
                "InsertFarmerLand",
                parameters
            );

            return Ok(result);
        }





        public class FarmerLand
        {
            public int? LandId { get; set; }
            public int FarmerId { get; set; }
            public string LandLocation { get; set; }
            public string SoilType { get; set; }
            public string WaterSource { get; set; }
            public decimal? Latitude { get; set; }
            public decimal? Longitude { get; set; }
            public int? UserId { get; set; } 
        }
        public class Farmer
        {
            public int FarmerId { get; set; }
            public string Name { get; set; }
            public string Phone { get; set; }
            public string Village { get; set; }
            public int DistrictId { get; set; }
            public int StateId { get; set; }
            public decimal? LandSize { get; set; }
            public int? UserId { get; set; }
        }


        [HttpPost("save-land")]
        public async Task<IActionResult> SaveLand([FromBody] SaveLandRequest req)
        {
            try
            {
                await _db.ExecuteAsync(
                    "SaveFarmerLand",
                    new
                    {
                        req.LandId,
                        req.FarmerId,
                        Location = req.Location,
                        req.SoilType,
                        req.WaterSource,
                        req.UserId
                    }
                );

                return Ok(new { message = "Land saved successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        public class SaveLandRequest
        {
            public int LandId { get; set; }
            public int FarmerId { get; set; }
            public string Location { get; set; }
            public string SoilType { get; set; }
            public string WaterSource { get; set; }
            public int UserId { get; set; }
        }
       

    }
}
