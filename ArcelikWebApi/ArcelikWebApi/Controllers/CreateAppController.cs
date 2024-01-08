using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArcelikWebApi.Data;
using ArcelikWebApi.Models;
using ArcelikWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreateAppController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IBlobService _blobService;
        //private readonly IFileUploadService _fileUploadService;

        public CreateAppController(ApplicationDbContext applicationDbContext,IBlobService BlobService)
        {
            _applicationDbContext = applicationDbContext;
            _blobService = BlobService;
            //_fileUploadService = fileUploadService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var aiApps = await _applicationDbContext.AiApplications
                //.Include(a => a.Pdfs) // Include the related PdfEntity records
                .ToListAsync();

            return new JsonResult(aiApps);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] AddAiAppViewModel formData)
        {
            if (ModelState.IsValid)
            {
                var aiApplication = new AiApplication()
                {
                    id = Guid.NewGuid(),
                    AppName = formData.AppName,
                    WelcomeMessage = formData.WelcomeMessage,
                    SystemPrompt = formData.SystemPrompt,
                    SelectedModel = formData.SelectedModel,
                    UseKnowledgebase = formData.UseKnowledgebase,
                    EnableUploadPdfFile = formData.Enable_Upload_Pdf_File,
                    ConversationRetentionPeriod = formData.ConversationRetentionPeriod,
                    ModalTemperature = formData.ModalTemperature,
                    Pdfs_Urls = string.Empty,
                    Email = formData.Email,
                    Date = formData.Date
                };

                _applicationDbContext.AiApplications.Add(aiApplication);

                var blobUrls = new List<string>();
               
                foreach (var pdfFile in formData.Pdfs)
                {
                    string blobUrl = await _blobService.Upload(pdfFile);
                    blobUrls.Add(blobUrl);
                }

                aiApplication.Pdfs_Urls = string.Join(",",blobUrls);
                var aiapp = aiApplication;
                _applicationDbContext.SaveChanges();


      

                return Ok(new { success = true, message = "Form data received successfully", data = aiApplication });
            }
            // return BadRequest(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });
            return Ok(new { success = false, message = "Form data couldnt received"});
        }

     
    }
}
