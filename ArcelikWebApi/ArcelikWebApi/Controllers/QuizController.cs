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

        // GET: api/quiz
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


        // POST: api/quiz/submit
        [HttpPost("submit")]
        public async Task<ActionResult> SubmitQuiz([FromBody] List<UserResponseDTO> userResponses)
        {
            try
            {
                int OverallScore = 0;

                foreach (var response in userResponses)
                {
                    switch (response.ReceivedQuestionType)
                    {
                        case "das": // DragAndSort Question Type
                            // Find the correct sorting order for the given question ID
                            var SortingOrder = await _context.CorrectSorting
                                    .Where(cs => cs.QuestionID == response.ReceivedQuestionID)
                                    .Select(cs => cs.SortingOrder)
                                    .FirstOrDefaultAsync();

                            // Compare user's sorting order with the correct one, null olmasını kıyaslamaya gerek yok
                            if (SortingOrder != null && response.ReceivedSortingOrder == SortingOrder)
                            {
                                // User's sorting order is correct
                                var SortingScore = await _context.CorrectSorting
                                            .Where(cs => cs.QuestionID == response.ReceivedQuestionID)
                                            .Select(cs => cs.SortingScore)
                                            .FirstOrDefaultAsync();

                                OverallScore += SortingScore;
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

                                OverallScore += TextScore;
                            }
   
                            break;

                        default:
                        // Assuming MultipleChoice or other question types
                        // Find the correct choices for the given question ID
                        // Fetch the correct choices for the given question ID from the CorrectChoices table
                      
                            var SelectedChoiceIds = response.ReceivedChoiceID;

                            // Retrieve the correct choices with their partial scores for the given question ID
                            //CHOICE ID YANLIŞ OLDUĞUNDA ERROR VERIYOR. IF STATEMENTI İLE YA DA TRY İLE DÜZELT.
                            var CorrectChoices = await _context.CorrectChoices
                                .Where(cc => cc.QuestionID == response.ReceivedQuestionID && SelectedChoiceIds.Contains(cc.ChoiceID))
                                .Select(cc => new { cc.PartialScore })
                                .ToListAsync();

    
                           foreach (var CorrectChoice in CorrectChoices)
                            {
                                OverallScore += CorrectChoice.PartialScore;
                                // Process choiceId and partialScore as needed
                            }
                            var asd = OverallScore;
                            //// Split the user's received choice ID into individual choices
                            break;
                    }

                }

                //foreach ended here
                // Retrieve user email from context.Items
                var userEmailFromContext = HttpContext.Items["UserEmail"] as string;

                var user = _context.Users
                                    .Where(u => u.Email == userEmailFromContext)
                                    .FirstOrDefault();

                // Add OverallScore to QuizPoint column where userID == userID
                user.QuizPoint = OverallScore;
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
