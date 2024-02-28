using ArcelikWebApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    // In your controller action where admin dashboard is accessed
    public class AdminController : Controller
    {

        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard")]
        public IActionResult AdminDashboard()
        {
            try
            {
                var userRoleFromContext = HttpContext.Items["UserRole"] as string;

                if (userRoleFromContext != "Admin")
                {
                    return Unauthorized(new { message = "User Role Not Authorized" });
                }

                return Ok("User role is valid, user is authorized.");
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
        }
    }
}
