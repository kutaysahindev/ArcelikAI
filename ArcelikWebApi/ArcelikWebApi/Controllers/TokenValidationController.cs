using ArcelikWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenValidationController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TokenValidationController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost("validation")]
        public async Task<IActionResult> ValidateToken()
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
                var Users = new User()
                {
                    id = Guid.NewGuid(),
                    Email = userEmailFromContext,
                    isWatched = false
                };

                _applicationDbContext.Users.Add(Users);
                _applicationDbContext.SaveChanges();
            }

            return Ok("Token validation completed.");
        }
    }
}