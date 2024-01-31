using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Data;
using ArcelikWebApi.Models.Quiz;
using Azure;

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

            return Ok(questions);

        }


        // POST: api/Quiz/submit
        [HttpPost("submit")]
        public async Task<ActionResult> SubmitQuiz([FromBody] List<UserResponseDTO> userResponses)
        {
            try
            {
                foreach (var response in userResponses)
                {
                    switch (response.ReceivedQuestionType)
                    {
                        case "Sorting":
                            // Find the correct sorting order for the given question ID
                            var sortingOrder = await _context.CorrectSorting
                                    .Where(cs => cs.QuestionID == response.ReceivedQuestionID)
                                    .Select(cs => cs.SortingOrder)
                                    .FirstOrDefaultAsync();

                            // Compare user's sorting order with the correct one
                            if (sortingOrder != null && response.ReceivedSortingOrder == sortingOrder)
                            {
                                // User's sorting order is correct
                                
                            }
                            else
                            {
                                // User's sorting order is incorrect
                               
                            }
                            break;

                        case "FillInTheBlank":
                            // Find the correct text answer for the given question ID
                            //var correctText = await _context.CorrectText.FirstOrDefaultAsync(ct => ct.QuestionID == response.QuestionID);
                            var correctText = await _context.CorrectText
                                    .Where(ct => ct.QuestionID == response.ReceivedQuestionID)
                                    .Select(ct => ct.CorrectTextAnswer)
                                    .FirstOrDefaultAsync();
                            // Compare user's text answer with the correct one (case insensitive)
                            if (correctText != null && response.ReceivedTextAnswer.ToLower() == correctText.ToLower())
                            {
                                // User's text answer is correct
                                
                            }
                            else
                            {
                                // User's text answer is incorrect
                               
                            }
                            break;

                        default: // Assuming MultipleChoice or other question types
                                 // Find the correct choices for the given question ID
                                 // Fetch the correct choices for the given question ID from the CorrectChoices table
                            var correctChoices = await _context.CorrectChoices
                                .Where(cc => cc.QuestionID == response.ReceivedQuestionID)
                                .Select(cc => cc.ChoiceID)
                                .ToListAsync();

                            //// Split the user's received choice ID into individual choices
                            var receivedChoices = new List<int> { response.ReceivedChoiceID };

                            // Count the number of correct choices selected by the user
                            int correctChoicesCount = correctChoices.Count(receivedChoices.Contains);

                            if(correctChoicesCount > 0)
                            {

                            }

                            break;
                    }
                }

                // Optionally, you can save user responses to the database or perform other operations here

                return Ok(userResponses);
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}