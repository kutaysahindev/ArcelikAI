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
                    var user = await _applicationDbContext.Users
                        .Include(u => u.WatchedVideos)
                        .FirstOrDefaultAsync(u => u.Email == userEmail);

                    if (user != null)
                    {
                        user.isWatched = model.IsWatched;

                        // Check if the user has already watched the video (ornegin 2.videoda kaldı user 3.saniyede 
                        // ve tekrar girdiğinde frontend bize VideoId 2 diye gönderecek bunu track edecegiz ve sadece saniyesinin
                        // güncellenmesini sağlayacağız.
                        var existingUserVideo = user.WatchedVideos
                            .Find(uv => uv.VideoId == model.VideoId);

                        if (existingUserVideo != null)
                        {
                            // Update the existing UserVideo entity
                            existingUserVideo.WatchedTimeInSeconds = model.WatchedTimeInSeconds;
                            // No need to add or update, as the entity is already being tracked
                        }
                        else
                        {
                            // Create a new UserVideo entity(eğer yeni bir video geçildiyse otomatik ekleyecek)
                            var newUserVideo = new UserVideo
                            {
                                VideoId = model.VideoId,
                                WatchedTimeInSeconds = model.WatchedTimeInSeconds,
                            };

                            // Add the new UserVideo to the user's watched videos
                            user.WatchedVideos.Add(newUserVideo);
                        }

                        // Update the database
                        await _applicationDbContext.SaveChangesAsync();

                        return Ok("Update to database is successful");
                    }
                    else
                    {
                        return NotFound("User not found");
                    }
                }
                else
                {
                    return BadRequest("User email not provided in the request");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
