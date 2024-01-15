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
                    //old code var user = await _applicationDbContext.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                    var user = await _applicationDbContext.Users
                        .Include(u => u.WatchedVideos)
                        .FirstOrDefaultAsync(u => u.Email == userEmail);

                    if (user != null)
                    {
                        user.isWatched = model.IsWatched;

                        var watchedVideo = new WatchedVideo
                        {
                            //VideoId = model.VideoId, the code will be used when frontend sending data
                            //DurationInSeconds = model.DurationInSeconds the code will be used when frontend sending data
                            VideoId = 2,
                            DurationInSeconds = 5
                        };

                        user.WatchedVideos.Add(watchedVideo);

                        // Update minutes watched directly with seconds, it may be deleted afterwards only seconds enough
                        user.MinutesWatched += model.DurationInSeconds;

                        // Update the database
                        await _applicationDbContext.SaveChangesAsync();

                        return Ok("Update to database is successful");
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
