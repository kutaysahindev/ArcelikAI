using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Data;
using ArcelikWebApi.Models.Quiz;

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public QuizController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Quiz
        [HttpGet("questions")]
        public async Task<ActionResult<IEnumerable<QuestionDTO>>> GetQuestions()
        {
            var questions = await _context.Questions
                .Include(q => q.Choices)
                .Select(q => new QuestionDTO
                {
                    QuestionID = q.QuestionID,
                    QuestionText = q.QuestionText,
                    QuestionType = q.QuestionType,
                    Choices = q.Choices.Select(c => new ChoiceDTO
                    {
                        ChoiceID = c.ChoiceID,
                        ChoiceText = c.ChoiceText
                    }).ToList()
                })
                .ToListAsync();

            var userquiz = await _context.Users
                .Select(q => new
                {
                    q.SecondsSpendOnQuiz
                })
                .ToListAsync();

            var combinedData = new
            {
                questions,
                userquiz,
            };

            return Ok(combinedData);

        }

       
        // POST: api/Quiz/submit
        [HttpPost("submit")]
        public async Task<ActionResult> SubmitQuiz([FromBody] List<UserResponseDTO> userResponses)
        {
            // Process user responses here
            foreach (var response in userResponses)
            {
                // Retrieve the question and user-selected choice from the database
                var question = await _context.Questions.FindAsync(response.SelectedQuestionID);
                var selectedChoice = await _context.Choices.FindAsync(response.SelectedChoiceID);

                // Process the user's response as needed
                // For example, you can store the responses in another table for tracking
            }

            // Optionally, return a response to the client
            return Ok("Quiz submitted successfully");
        }
    }
}