using System.Threading.Tasks;
using ArcelikWebApi.Data;
using ArcelikWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    public class UserVideoController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public UserVideoController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        // GET: api/uservideo/iswatched
        [HttpGet("iswatched")]
        public async Task<IActionResult> GetIsWatchedStatus()
        {
            var isWatchedStatusList = await _applicationDbContext.Users
                .Select(user => user.isWatched)
                .ToListAsync();

            return Ok(isWatchedStatusList);
        }

        // POST: api/uservideo/iswatched
        [HttpPost("iswatched")]
        public async Task<IActionResult> UpdateIsWatchedStatus([FromBody] IsWatchedModel model)
        {
            try
            {
                var userEmail = HttpContext.Items["UserEmail"] as string;

                if (userEmail != null)
                {
                    // Find the user by email
                    var user = await _applicationDbContext.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                    if (user != null)
                    {
                        user.isWatched = model.IsWatched;

                        // Update the database
                        await _applicationDbContext.SaveChangesAsync();

                        return Ok("Update successful");
                    }
                    else
                    {
                        return NotFound("User not found"); // Customize the response as needed
                    }
                }
                else
                {
                    return BadRequest("User email not provided in the request"); // Customize the response as needed
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
