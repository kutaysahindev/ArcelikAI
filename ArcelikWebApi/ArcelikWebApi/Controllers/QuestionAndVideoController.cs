using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArcelikWebApi.Data;
using ArcelikWebApi.Models;
using ArcelikWebApi.Models.Quiz;
using ArcelikWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    public class QuestionAndVideoController : ControllerBase
    {

        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IBlobService _blobService;

        public QuestionAndVideoController(ApplicationDbContext applicationDbContext, IBlobService BlobService)
        {
            _applicationDbContext = applicationDbContext;
            _blobService = BlobService;
        }
        // POST api/values
        [HttpPost("postquestion")]
        public async Task<IActionResult> Post([FromBody] AddQuestionDTO questionDTO)
        {
            var LastQuestionId = await _applicationDbContext.Questions
                                   .Select(q => q.QuestionID)
                                   .OrderByDescending(q => q)
                                   .FirstOrDefaultAsync();


            //var LastQuestionId = 18;

            //This part uploads question to database
            var questions = new Questions
            {
                //  QuestionID = LastQuestionId + 1,
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
                    /* var LastChoiceId = await _applicationDbContext.Choices
                                   .Select(q => q.ChoiceID)
                                   .OrderByDescending(q => q)
                                   .FirstOrDefaultAsync();
                    */

                    foreach (var choice in questionDTO.Choices)
                    {
                        var choices = new Choices
                        {
                            //ChoiceID = LastChoiceId + 1,
                            QuestionID = LastQuestionId + 1,
                            ChoiceText = choice
                        };

                        //LastChoiceId++;
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
                //Correct answersın array şeklinde gelmesi gerekiyor.
                case "Sorting":
                    /*
                    var LastCorrectSortingId = await _applicationDbContext.CorrectSorting
                                 .OrderByDescending(q => q.CorrectSortingID)
                                 .Select(q => q.CorrectSortingID)
                                 .FirstOrDefaultAsync();
                    */

                    int concatenatedAnswerIds = 0;

                    foreach (var answer in questionDTO.CorrectAnswers)
                    {
                        var answerid = await _applicationDbContext.Choices
                        .Where(c => c.ChoiceText == answer)
                        .Select(c => c.ChoiceID)
                        .FirstOrDefaultAsync();

                        concatenatedAnswerIds = int.Parse(concatenatedAnswerIds.ToString() + answerid.ToString());
                    }
                    var correctSorting = new CorrectSorting
                    {
                        //CorrectSortingID = LastCorrectSortingId + 1,
                        QuestionID = LastQuestionId + 1,
                        SortingOrder = concatenatedAnswerIds,
                        SortingScore = 10
                    };

                    _applicationDbContext.CorrectSorting.Add(correctSorting);

                    // Save changes to the database
                    await _applicationDbContext.SaveChangesAsync();

                    break;

                case "FillInTheBlank":
                    /*
                    var LastCorrecTextId = await _applicationDbContext.CorrectText
                        .OrderByDescending(q => q.CorrectTextID)
                        .Select(q => q.CorrectTextID)
                        .FirstOrDefaultAsync();
                    */
                    var correctText = new CorrectText
                    {
                        //CorrectTextID = LastCorrecTextId + 1,
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
                    /*
                    var LastCorrectChoiceId = await _applicationDbContext.CorrectChoices
                                   .OrderByDescending(q => q.CorrectChoiceID)
                                   .Select(q => q.CorrectChoiceID)
                                   .FirstOrDefaultAsync();
                    */

                    foreach (var answer in questionDTO.CorrectAnswers)
                    {
                        var correctanswerid = await _applicationDbContext.Choices
                        .OrderByDescending(q => q.ChoiceID)
                        .Where(c => c.ChoiceText == answer)
                        .Select(c => c.ChoiceID)
                        .FirstOrDefaultAsync();

                        if (correctanswerid == 0)
                        {
                            continue;
                        }

                        var correctChoices = new CorrectChoices
                        {
                            //CorrectChoiceID = LastCorrectChoiceId + 1,
                            QuestionID = LastQuestionId + 1,
                            ChoiceID = correctanswerid,
                            PartialScore = 10
                        };

                        //LastCorrectChoiceId++;
                        //Add the new question to the context
                        _applicationDbContext.CorrectChoices.Add(correctChoices);

                    }
                    // Save changes to the database
                    await _applicationDbContext.SaveChangesAsync();

                    break;

            }

            return Ok(new { success = true, message = "New question added to database" });

        }


    }
}

