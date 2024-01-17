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

        public SaveUserController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost("save")]
        public async Task<IActionResult> saveUser()
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
                    isWatchedAll = false,
                    WatchedVideoId = 1,
                    WatchedTimeInSeconds = 0
                };

                _applicationDbContext.Users.Add(Users);
                _applicationDbContext.SaveChanges();
            }

            return Ok("Token validation completed.");
        }
    }
}