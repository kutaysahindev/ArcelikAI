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

        // GET: api/uservideo/status
        [HttpGet("status")]
        public async Task<IActionResult> GetUserVideoStatus()
        {
            var userEmail = HttpContext.Items["UserEmail"] as string;

            if (string.IsNullOrEmpty(userEmail))
                return BadRequest("User email not provided in the request");

            var userStatus = await _applicationDbContext.Users
                .Where(user => user.Email == userEmail)
                .Select(user => new
                {
                    user.WatchedVideoId,
                    user.WatchedTimeInSeconds
                })
                .FirstOrDefaultAsync();

            if (userStatus == null)
                return NotFound("User not found");

            var videoCount = await _applicationDbContext.Videos.CountAsync();
            var lastVideoId = await _applicationDbContext.Videos.MaxAsync(v => (int?)v.Id) ?? 0;
            var lastTimeInSeconds = 16;

            var isWatchedAll = userStatus.WatchedVideoId >= lastVideoId && userStatus.WatchedTimeInSeconds >= lastTimeInSeconds;

            var videoDetails = await _applicationDbContext.Videos
                .Select(video => new { video.Id, video.BlobStorageUrl })
                .ToListAsync();

            var statusList = new
            {
                userStatus.WatchedVideoId,
                userStatus.WatchedTimeInSeconds,
                VideoCount = videoCount,
                VideoDetails = videoDetails,
                IsWatchedAll = isWatchedAll
            };

            return Ok(statusList);
        }


        // POST: api/uservideo/updatewatched
        [HttpPost("updatewatched")]
        public async Task<IActionResult> UpdateWatchedStatus([FromBody] WatchedVideoUpdateRequest request)
        {
            var userEmail = HttpContext.Items["UserEmail"] as string;

            if (string.IsNullOrEmpty(userEmail))
                return BadRequest("User email not provided in the request");

            var user = await _applicationDbContext.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
                return NotFound("User not found");

            if (user.WatchedVideoId == request.WatchedVideoId)
            {

                if (request.WatchedTimeInSeconds - user.WatchedTimeInSeconds <= 3)
                {
                    // Update the watched video and time
                    user.WatchedTimeInSeconds = request.WatchedTimeInSeconds;
                    await _applicationDbContext.SaveChangesAsync();
                    return Ok("Watched video updated successfully");
                }
                else
                {
                    return BadRequest("Invalid time or duration exceeded");
                }
            }
            else if (request.WatchedVideoId > user.WatchedVideoId && (request.WatchedVideoId - user.WatchedVideoId) <= 1)
            {

                // Fetch the duration of the currently watched video from the database
                var currentVideoDuration = await _applicationDbContext.Videos
                    .Where(v => v.Id == user.WatchedVideoId)
                    .Select(v => v.DurationInSeconds)
                    .FirstOrDefaultAsync();

                // Calculate the time difference between the current time of the current video
                // and the start time of the requested video
                var timeDifference = (currentVideoDuration - user.WatchedTimeInSeconds) + request.WatchedTimeInSeconds;

                if (timeDifference <= 3)
                {
                    // Accept the request if the time difference is within 3 seconds
                    user.WatchedVideoId = request.WatchedVideoId;
                    user.WatchedTimeInSeconds = request.WatchedTimeInSeconds;
                    await _applicationDbContext.SaveChangesAsync();
                    return Ok("Watched video updated successfully");
                }
                else
                {
                    return BadRequest("Invalid time or duration exceeded");
                }

            }
            else
            {
                return BadRequest("Invalid video ID");
            }
        }
    }
}
