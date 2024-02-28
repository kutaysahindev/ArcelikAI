using ArcelikWebApi.Data;
using ArcelikWebApi.Models;
using ArcelikWebApi.Models.Admin;
using ArcelikWebApi.Models.Quiz;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    public class AdminQuestionController : ControllerBase
    {

        private readonly ApplicationDbContext _applicationDbContext;

        public AdminQuestionController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        // POST api/values
        [HttpPost("postquestion")]
        public async Task<IActionResult> Post([FromBody] CreateQuestionDTO questionDTO)
        {
            var LastQuestionId = await _applicationDbContext.Questions
                                   .Select(q => q.QuestionID)
                                   .OrderByDescending(q => q)
                                   .FirstOrDefaultAsync();


            //This part uploads question to database
            var questions = new Questions
            {
                QuestionText = questionDTO.QuestionText,
                QuestionType = questionDTO.QuestionType,
            };

            //Add the new question to the context
            _applicationDbContext.Questions.Add(questions);

            // Save changes to the database
            await _applicationDbContext.SaveChangesAsync();


            //This part uploads choices to database
            switch (questionDTO.QuestionType)
            {
                case "MultipleChoiceAndAnswers":
                case "MultipleChoice":
                case "TrueFalse":
                case "Sorting":

                    foreach (var choice in questionDTO.Choices)
                    {
                        var choices = new Choices
                        {
                            QuestionID = LastQuestionId + 1,
                            ChoiceText = choice
                        };

                        //Add the new question to the context
                        _applicationDbContext.Choices.Add(choices);

                    }
                    // Save changes to the database
                    await _applicationDbContext.SaveChangesAsync();

                    break;

                default:

                    break;

            }


            //This part uploads answers to database
            switch (questionDTO.QuestionType)
            {
                //Correct answersın array şeklinde gelmesi gerekiyor.[ankara,istanbul] [1,2,3] [3,2,1] 10 11 12  121110
                //query yaparken tüm choicelere bakmasın sadece question id ile ilgili yerlere baksın
                case "Sorting":

                    int concatenatedAnswerIds = 0;

                    foreach (var answer in questionDTO.CorrectAnswers)
                    {
                        var answerid = await _applicationDbContext.Choices
                        .Where(c => c.ChoiceText == answer && c.QuestionID == LastQuestionId + 1)
                        .Select(c => c.ChoiceID)
                        .FirstOrDefaultAsync();

                        concatenatedAnswerIds = int.Parse(concatenatedAnswerIds.ToString() + answerid.ToString());
                    }
                    var correctSorting = new CorrectSorting
                    {
                        QuestionID = LastQuestionId + 1,
                        SortingOrder = concatenatedAnswerIds,
                        SortingScore = 10
                    };

                    _applicationDbContext.CorrectSorting.Add(correctSorting);

                    // Save changes to the database
                    await _applicationDbContext.SaveChangesAsync();

                    break;

                case "FillInTheBlank":

                    var correctText = new CorrectText
                    {
                        QuestionID = LastQuestionId + 1,
                        CorrectTextAnswer = questionDTO.CorrectAnswers[0],
                        TextScore = 10
                    };

                    _applicationDbContext.CorrectText.Add(correctText);
                    // Save changes to the database
                    await _applicationDbContext.SaveChangesAsync();

                    break;

                case "MultipleChoiceAndAnswers":
                case "MultipleChoice":
                case "TrueFalse":

                    foreach (var answer in questionDTO.CorrectAnswers)
                    {
                        var correctanswerid = await _applicationDbContext.Choices
                        .Where(c => c.ChoiceText == answer && c.QuestionID == LastQuestionId + 1)
                        .Select(c => c.ChoiceID)
                        .FirstOrDefaultAsync();

                        if (correctanswerid == 0)
                        {
                            continue;
                        }

                        var correctChoices = new CorrectChoices
                        {
                            QuestionID = LastQuestionId + 1,
                            ChoiceID = correctanswerid,
                            PartialScore = 10
                        };

                        //Add the new question to the context
                        _applicationDbContext.CorrectChoices.Add(correctChoices);

                    }
                    // Save changes to the database
                    await _applicationDbContext.SaveChangesAsync();

                    break;

            }

            return Ok(new { success = true, message = "New question added to database" });

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _applicationDbContext.Questions
                .FirstOrDefaultAsync(q => q.QuestionID == id);

            if (question == null)
            {
                return NotFound();
            }

            switch (question.QuestionType)
            {
                case "MultipleChoiceAndAnswers":
                case "MultipleChoice":
                case "TrueFalse":
                    // Delete CorrectChoices rows associated with Multiple Answers questions
                    var correctChoices = await _applicationDbContext.CorrectChoices
                        .Where(cc => cc.QuestionID == id)
                        .ToListAsync();

                    _applicationDbContext.CorrectChoices.RemoveRange(correctChoices);

                    break;

                case "Sorting":
                    // Delete CorrectSorting row associated with Sorting questions
                    var correctSorting = await _applicationDbContext.CorrectSorting
                        .FirstOrDefaultAsync(cs => cs.QuestionID == id);

                    if (correctSorting != null)
                    {
                        _applicationDbContext.CorrectSorting.Remove(correctSorting);
                    }

                    break;

                case "FillInTheBlank":
                    // Delete CorrectText row associated with Fill in the Blank questions
                    var correctText = await _applicationDbContext.CorrectText
                        .FirstOrDefaultAsync(ct => ct.QuestionID == id);

                    if (correctText != null)
                    {
                        _applicationDbContext.CorrectText.Remove(correctText);
                    }
                    break;

                default:
                    break;
            }

            if (question.QuestionType != "FillInTheBlank")
            {
                // Delete related Choices rows if the question type is not FillInTheBlank
                var choices = await _applicationDbContext.Choices
                    .Where(c => c.QuestionID == id)
                    .ToListAsync();

                _applicationDbContext.Choices.RemoveRange(choices);
            }
            // Delete the Questions row
            _applicationDbContext.Questions.Remove(question);

            await _applicationDbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestionText(int id, [FromForm] string questionText)
        {
            // Retrieve the question by ID
            var question = await _applicationDbContext.Questions.FirstOrDefaultAsync(q => q.QuestionID == id);

            if (question == null)
            {
                return NotFound();
            }

            // Update the question text
            question.QuestionText = questionText;

            try
            {
                // Save changes to the database
                await _applicationDbContext.SaveChangesAsync();
                return Ok(questionText);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }



    }
}