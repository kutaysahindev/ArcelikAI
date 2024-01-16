using ArcelikWebApi.Data;
using ArcelikWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TimeController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet("getUserVideoInfo")]
        public async Task<IActionResult> getUserVideoInfo(string userEmail)
        {
            try
            {
                // Fetch the user's information including isWatched value
                var user = await _applicationDbContext.Users
                    .Include(u => u.WatchedVideos)
                    .Where(u => u.Email == userEmail)
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    return NotFound("User not found");
                }

                // Get the latest watched video
                var latestWatchedVideo = user.WatchedVideos.OrderByDescending(wv => wv.Id).FirstOrDefault();

                if (latestWatchedVideo == null)
                {
                    return NotFound("No watched videos found");
                }

                // Fetch the related Video for the latest watched video
                var videoInfo = await _applicationDbContext.Videos
                    .Where(v => v.Id == latestWatchedVideo.VideoId)
                    .FirstOrDefaultAsync();

                if (videoInfo == null)
                {
                    return NotFound("Video not found");
                }

                // Fetch the latest Video Id
                var latestVideoId = await _applicationDbContext.Videos
                    .OrderByDescending(v => v.Id)
                    .Select(v => v.Id)
                    .FirstOrDefaultAsync();

                // Prepare the data to send to the frontend
                var responseData = new
                {
                    allCompleted = user.isWatched,
                    VideoMarkId = latestWatchedVideo.VideoId,
                    VideoMarkTime = latestWatchedVideo.DurationInSeconds,
                    VideoCount = latestVideoId,
                    videoInfo = new
                    {
                        VideoID = videoInfo.Id,
                        src = videoInfo.BlobStorageUrl
                    }
                };

                return Ok(responseData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
        