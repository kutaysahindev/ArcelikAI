using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArcelikWebApi.Data;
using ArcelikWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;
using static System.Net.Mime.MediaTypeNames;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaveUserController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        private readonly ILogger<SaveUserController> _logger;

        public SaveUserController(ApplicationDbContext applicationDbContext, ILogger<SaveUserController> logger)
        {
            _applicationDbContext = applicationDbContext;
            _logger = logger;

        }

        [HttpPost("save")]
        public async Task<IActionResult> saveUser()
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
                    return Unauthorized(new { message = "User Email Not Found" });
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
                        isWatchedAll = false,
                        WatchedVideoId = 1,
                        WatchedTimeInSeconds = 0,
                        isTutorialDone = false,
                        QuizPoint = 0
                    };
                    

                    _applicationDbContext.Users.Add(Users);
                    _applicationDbContext.SaveChanges();
                }

                return Ok("Token valid, user save to the database completed.");
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