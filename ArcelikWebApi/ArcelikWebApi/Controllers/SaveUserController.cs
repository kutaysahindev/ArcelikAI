using ArcelikWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;

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
        public async Task<IActionResult> SaveUser()
        {
            try
            {
                var userEmailFromContext = HttpContext.Items["UserEmail"] as string;

                if (userEmailFromContext == null)
                {
                    return Unauthorized(new { message = "User Email Not Found" });
                }

                var existingUser = await _applicationDbContext.Users
                    .FirstOrDefaultAsync(user => user.Email == userEmailFromContext);

                bool isSaved = existingUser != null;

                if (!isSaved)
                {
                    var Users = new Users()
                    {
                        id = Guid.NewGuid(),
                        Email = userEmailFromContext,
                        isWatchedAll = false,
                        WatchedVideoId = 1,
                        WatchedTimeInSeconds = 0,
                        isTutorialDone = false,
                        QuizPoint = 0,
                        IsPassed = false
                    };
                    

                    _applicationDbContext.Users.Add(Users);
                    await _applicationDbContext.SaveChangesAsync();
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