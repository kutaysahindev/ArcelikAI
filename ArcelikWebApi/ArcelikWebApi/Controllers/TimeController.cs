using ArcelikWebApi.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        //I willl add a logic in here to sent the latest time of the user's latest watched video count
        //and the time spent to the frontend.
    }
}
