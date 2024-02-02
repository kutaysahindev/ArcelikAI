using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcelikWebApi.Data;
using ArcelikWebApi.Models.Quiz;
using Azure;
using ArcelikWebApi.Models;

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
                int overallScore = 0;

                foreach (var response in userResponses)
                {
                    switch (response.ReceivedQuestionType)
                    {
                        case "das": // DragAndSort Question Type
                            // Find the correct sorting order for the given question ID
                            var sortingOrder = await _context.CorrectSorting
                                    .Where(cs => cs.QuestionID == response.ReceivedQuestionID)
                                    .Select(cs => cs.SortingOrder)
                                    .FirstOrDefaultAsync();

                            // Compare user's sorting order with the correct one
                            if (sortingOrder != null && response.ReceivedSortingOrder == sortingOrder)
                            {
                                // User's sorting order is correct
                                var SortingScore = await _context.CorrectSorting
                                            .Where(cs => cs.QuestionID == response.ReceivedQuestionID)
                                            .Select(cs => cs.SortingScore)
                                            .FirstOrDefaultAsync();

                                overallScore += SortingScore;
                            }
  
                            break;

                        case "oe":
                            // OpenEnded Question
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
                                var TextScore = await _context.CorrectText
                                                    .Where(ct => ct.QuestionID == response.ReceivedQuestionID)
                                                    .Select(ct => ct.TextScore)
                                                    .FirstOrDefaultAsync();

                                overallScore += TextScore;
                            }
   
                            break;

                        default:
                            try
                            {
                                var SelectedChoiceIds = response.ReceivedChoiceID;

                                // Check if there are any correct choices in the database for the given question and selected choices
                                var CorrectChoices = await _context.CorrectChoices
                                    .Where(cc => cc.QuestionID == response.ReceivedQuestionID && SelectedChoiceIds.Contains(cc.ChoiceID))
                                    .ToListAsync();

                                if (CorrectChoices.Any())
                                {
                                    // If there are correct choices, retrieve their partial scores
                                    var PartialScores = CorrectChoices.Select(cc => cc.PartialScore).ToList();

                                    // Calculate overall score with the correct choices partial score
                                    foreach (var partialScore in PartialScores)
                                    {
                                        overallScore += partialScore;
                                    }
                                }

                            }
                            catch (Exception ex)
                            {
                                // Handle any exceptions that might occur during database query or processing.
                                return Ok(new { success = false, message = "The error accured when try select correct choice with LINQ query " });
                            }
                            break;
                    }

                }

                //foreach ended here
                // Retrieve user email from context.Items
                var userEmailFromContext = HttpContext.Items["UserEmail"] as string;

                var user = _context.Users
                                    .Where(u => u.Email == userEmailFromContext)
                                    .FirstOrDefault();

                // Add overallScore to QuizPoint column where userID == userID
                user.QuizPoint = overallScore;
                await _context.SaveChangesAsync();

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
