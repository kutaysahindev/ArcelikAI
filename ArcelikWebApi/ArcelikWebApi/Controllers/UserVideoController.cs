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

        // Get iswatched attirubute from db.
        // GET: api/uservideo/iswatched
        [HttpGet("status")]
        public async Task<IActionResult> GetUserVideoStatus()
        {
            var userEmail = HttpContext.Items["UserEmail"] as string;

            var StatusList = await _applicationDbContext.Users
                .Where(user => user.Email == userEmail)
                .Select(user => new
                {
                    user.isWatchedAll,
                    user.WatchedVideoId,
                    user.WatchedTimeInSeconds,
                    user.isTutorialDone,
                    VideoCount = _applicationDbContext.Videos.Count(), // Count of videos in the database,
                    VideoDetails = _applicationDbContext.Videos
                        .Select(video => new { video.Id, video.BlobStorageUrl })
                        .ToList()
                })
                .FirstOrDefaultAsync();


            return Ok(StatusList);
        }

        // POST: api/uservideo/watched
        [HttpPost("updatewatched")]
        public async Task<IActionResult> UpdateWatchedStatus([FromBody] WatchedVideoUpdateRequest request)
        {
            try
            {
                var userEmail = HttpContext.Items["UserEmail"] as string;

                if (userEmail != null)
                {
                    // Find the user by email
                    var user = await _applicationDbContext.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                    if (user == null)
                    {
                        return NotFound("User not found"); // Customize the response as needed
                    }

                    var video = _applicationDbContext.Videos.Find(request.WatchedVideoId);

                    if (video == null)
                    {
                        return BadRequest("Invalid WatchedVideoId");
                    }

                    // Update the watched video and time
                    user.WatchedVideoId = request.WatchedVideoId;
                    user.WatchedTimeInSeconds = request.WatchedTimeInSeconds;
                    user.isWatchedAll = request.IsWatchedAll;

                    _applicationDbContext.SaveChangesAsync();

                    return Ok("Watched video updated successfully");
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
        [HttpPost("updatetutorial")]
        public async Task<IActionResult> UpdateTutorialStatus([FromBody] TutorialViewModel tutorialrequest)
        {
            try
            {
                var userEmail = HttpContext.Items["UserEmail"] as string;

                if (userEmail != null)
                {
                    // Find the user by email
                    var user = await _applicationDbContext.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                    if (user == null)
                    {
                        return NotFound("User not found"); // Customize the response as needed
                    }

                    user.isTutorialDone = tutorialrequest.isTutorialDone;

                    await _applicationDbContext.SaveChangesAsync();

                    return Ok("Tutorial status updated successfully");
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
