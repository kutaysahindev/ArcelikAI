using ArcelikWebApi.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/application-settings")]
public class ApplicationSettingsController : ControllerBase
{
    private readonly ApplicationDbContext _applicationDbContext;

    public ApplicationSettingsController(ApplicationDbContext context)
    {
        _applicationDbContext = context;
    }

    [HttpGet("getapplication")]
    public IActionResult GetApplicationSettings()
    {
        var applicationSettings = _applicationDbContext.ApplicationSettings.FirstOrDefault();

        if (applicationSettings == null)
        {
            return NotFound("Application settings not found");
        }

        return Ok(applicationSettings);
    }

}
