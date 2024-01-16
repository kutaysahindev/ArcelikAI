using ArcelikWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using ArcelikWebApi.Middlewares;

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenValidationController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        private readonly ILogger<TokenValidationController> _logger;

        public TokenValidationController(ApplicationDbContext applicationDbContext,
            ILogger<TokenValidationController> logger)
        {
            _applicationDbContext = applicationDbContext;
            _logger = logger;
        }

        [HttpPost("validation")]
        public async Task<IActionResult> ValidateToken()
        {
            try
            {
                var emails = await _applicationDbContext.Users
                    .Select(user => user.Email)
                    .ToListAsync();

                // Retrieve user email from context.Items
                var userEmailFromContext = HttpContext.Items["UserEmail"] as string;

                if (userEmailFromContext == null)
                {
                    return Unauthorized(new { message = "Token validation failed" });
                }

                bool isSaved = false;

                foreach (var email in emails)
                {
                    if (email == userEmailFromContext)
                    {
                        isSaved = true;
                    }
                }

                if (isSaved == false)
                {
                    var Users = new Users()
                    {
                        id = Guid.NewGuid(),
                        Email = userEmailFromContext,
                        isWatched = false
                    };

                    _applicationDbContext.Users.Add(Users);
                    _applicationDbContext.SaveChanges();
                }

                return Ok("Token validation completed.");
            }
            catch (ArgumentException ex)
            {
                // Log the specific error
                if (ex.Message.Contains("IDX12729"))
                {
                    return BadRequest(new { message = "Invalid token structure or length." });
                }
                else if (ex.Message.Contains("IDX10503"))
                {
                    return BadRequest(new { message = "Invalid token format." });
                }

                // Generic error response
                return StatusCode(500, new { message = "Internal Server Error", details = ex.Message });

            }
            catch (Exception ex)
            {
                // Log any other unexpected exceptions
                _logger.LogError(ex, "Unexpected error during token validation: {ErrorMessage}", ex.Message);

                return StatusCode(500, new { message = "Internal Server Error", details = ex.Message });
            }

        }
    }
}

