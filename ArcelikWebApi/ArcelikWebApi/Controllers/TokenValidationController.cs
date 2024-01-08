using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenValidationController : ControllerBase
    {
        [HttpPost("validation")]
        public async Task<IActionResult> ValidateToken()
        {
            // Retrieve user email from context.Items
            var userEmailFromContext = HttpContext.Items["UserEmail"] as string;

            if (userEmailFromContext == null)
            {
                return Unauthorized(new { message = "Token validation failed" });
            }
            return Ok("Token validation completed.");
        }
    }
}
