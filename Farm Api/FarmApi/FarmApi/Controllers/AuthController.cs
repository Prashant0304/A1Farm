using FarmApi.Models.DTO;
using FarmApi.Models.Request;
using FarmApi.Models.Response;
using FarmApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace FarmApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DbService _db;
        private readonly IJwtService _jwt;

        public AuthController(DbService db, IJwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Phone) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest(new AuthResponse { Success = false, Message = "Phone and password required." });

            var users = await _db.QueryAsync<dynamic>(
                "Login",   // your SP
                new { Phone = req.Phone }
            );

            var user = users.FirstOrDefault();

            if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
                return Unauthorized(new AuthResponse { Success = false, Message = "Invalid credentials." });

            var userDto = new UserDto
            {
                UserId = user.UserId,
                Name = user.Name,
                Phone = user.Phone,
                RoleId = user.RoleId,
                FarmerId = user.FarmerId
            };

            var token = _jwt.GenerateToken(userDto);

            return Ok(new AuthResponse
            {
                Success = true,
                Token = token,
                Message = "Login successful",
                User = userDto
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Phone) ||
                string.IsNullOrWhiteSpace(req.Password) ||
                string.IsNullOrWhiteSpace(req.Name))
            {
                return BadRequest(new AuthResponse { Success = false, Message = "Required fields missing." });
            }

            var existing = await _db.QueryAsync<dynamic>(
                "Login",
                new { Phone = req.Phone }
            );

            if (existing.Any())
                return Conflict(new AuthResponse { Success = false, Message = "Phone already exists." });

            var hashed = BCrypt.Net.BCrypt.HashPassword(req.Password);

            await _db.ExecuteAsync(
                "SaveUser",
                new
                {
                    UserId = 0,
                    Name = req.Name,
                    Phone = req.Phone,
                    PasswordHash = hashed,
                    RoleId = req.RoleId,
                    FarmerId = (int?)null,
                    UserIdAudit = 1
                }
            );

            var userDto = new UserDto
            {
                Name = req.Name,
                Phone = req.Phone,
                RoleId = req.RoleId,
                FarmerId = (int?)null
            };

            var token = _jwt.GenerateToken(userDto);

            return Ok(new AuthResponse
            {
                Success = true,
                Token = token,
                Message = "Registration successful",
                User = userDto
            });
        }
    }



}
