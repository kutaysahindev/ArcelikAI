using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArcelikWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [ApiController]
    [Route("api/models")]
    public class AIModelsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetModels()
        {
            // Update the models to include additional information
            var models = new List<AIModels>
            {
            new AIModels(1, "GPT-3.5", "Advanced AI Language Model"),
            new AIModels(2, "GPT-3.5 - 16K", "Enhanced, large scale AI Model"),
            new AIModels(3, "GPT-4", "Cutting edge AI Model"),
            new AIModels(4, "GPT-4 Turbo", "High-speed, advanced AI Model"),
            new AIModels(5, "Stable Diffusion", "Innovative AI image generator"),
            new AIModels(6, "LLAMA2","Advanced AI Language Model")
            // Add more models as needed
            };

            return Ok(models);
        }

    }
}

