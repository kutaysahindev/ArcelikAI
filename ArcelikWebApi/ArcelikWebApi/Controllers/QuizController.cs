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

        [HttpGet("questions")]
        public async Task<ActionResult<IEnumerable<QuestionDTO>>> GetQuestions()
        {
            // Retrieve 5 static questions for each question type
            var staticQuestions = await GetStaticQuestions();

            // Retrieve 5 random questions for each question type
            var randomQuestions = await GetRandomQuestions();

            // Combine static and random questions
            var allQuestions = staticQuestions.Concat(randomQuestions).ToList();

            return Ok(allQuestions);
        }

        private async Task<List<QuestionDTO>> GetStaticQuestions()
        {
            var staticQuestions = await _context.Questions
                .Where(q => (q.QuestionID == 1 || q.QuestionID == 4 || q.QuestionID == 7 || q.QuestionID == 10 || q.QuestionID == 13))
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

            return staticQuestions;
        }

        private async Task<List<QuestionDTO>> GetRandomQuestions()
        {
            var excludedQuestionIds = new List<int> { 1, 4, 7, 10, 13 };

            var randomQuestions = await _context.Questions
                .Where(q => !excludedQuestionIds.Contains(q.QuestionID))
                .OrderBy(q => Guid.NewGuid())
                .AsNoTracking()
                .Take(5)
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

            return randomQuestions;
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
