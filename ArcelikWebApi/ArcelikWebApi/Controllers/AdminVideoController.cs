using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;
using ArcelikWebApi.Services;
using ArcelikWebApi.Data;
using ArcelikWebApi.Models.Admin;
using Azure.Storage.Blobs;

namespace ArcelikWebApi.Controllers
{
    [Route("api/adminvideo")]
    [ApiController]
    public class AdminVideoController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IBlobService _blobService;

        public AdminVideoController(ApplicationDbContext dbContext, IBlobService blobService)
        {
            _dbContext = dbContext;
            _blobService = blobService;
        }

        //getvideos with ids and titles to the admin dashboard
        [HttpGet]
        public async Task<IActionResult> GetAllVideos()
        {
            var videos = await _dbContext.Videos
                .Select(v => new { Id = v.Id, Title = v.Title })
                .ToListAsync();

            return Ok(videos);
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo([FromForm] CreateVideoDTO videoDto)
        {
            if (videoDto.VideoFile == null || videoDto.VideoFile.Length == 0)
            {
                return BadRequest("Video file is missing or empty.");
            }

            // Upload the video file to Azure Blob Storage
            var blobStorageUrl = await _blobService.Upload(videoDto.VideoFile, "videos");


            // Save the video metadata to the database
            var newVideo = new Video
            {
                Title = videoDto.Title,
                BlobStorageUrl = blobStorageUrl,
                DurationInSeconds = videoDto.DurationInSeconds
            };

            _dbContext.Videos.Add(newVideo);
            await _dbContext.SaveChangesAsync();

            return Ok(newVideo); // Return the created video object
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            var video = await _dbContext.Videos.FindAsync(id);

            if (video == null)
            {
                return NotFound();
            }

            // Delete the blob from blob storage
            await _blobService.Delete(video.BlobStorageUrl, "videos"); // Replace "containerName" with your actual container name

            _dbContext.Videos.Remove(video);

            await _dbContext.SaveChangesAsync();

            return NoContent(); // Return 204 No Content on successful deletion
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVideo(int id, [FromForm] UpdateVideoDTO videoDto)
        {
            // Find the video in the database by ID
            var video = await _dbContext.Videos.FindAsync(id);

            if (video == null)
            {
                return NotFound(); // Video not found
            }

            // Check if both title and video file are not provided
            if (string.IsNullOrEmpty(videoDto.Title) && (videoDto.VideoFile == null || videoDto.VideoFile.Length == 0))
            {
                return BadRequest("You need to provide either the title or the video file to update.");
            }

            // Update the video file if provided
            if (videoDto.VideoFile != null && videoDto.VideoFile.Length > 0)
            {
                // Upload the new video file to Azure Blob Storage
                var blobStorageUrl = await _blobService.Upload(videoDto.VideoFile, "videos");
                video.BlobStorageUrl = blobStorageUrl;
            }

            // Update the video's title if provided
            if (!string.IsNullOrEmpty(videoDto.Title))
            {
                video.Title = videoDto.Title;
            }

            // Save changes to the database
            await _dbContext.SaveChangesAsync();

            return Ok(video); // Return the updated video object
        }

    }
}