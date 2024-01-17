using ArcelikWebApi.Data;
using ArcelikWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ArcelikWebApi.Models;

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

    /*
    public IActionResult UpdateApplicationSettings()
    {
        var existingSettings = _applicationDbContext.ApplicationSettings.FirstOrDefault();

        if (existingSettings == null)
        {
            return NotFound("Application settings not found");
        }

        // Update the properties you want to change
        existingSettings.LandingUrl = "New link";
        existingSettings.SupportedFileTypes = "Pdf";

        _applicationDbContext.SaveChanges();

        return Ok("Application settings updated successfully");
    }
    */
}
