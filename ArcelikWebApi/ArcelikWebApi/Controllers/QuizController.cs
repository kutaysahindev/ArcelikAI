﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArcelikWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        public readonly ApplicationDbContext _applicationDbContext;

        public QuizController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            var quiz = await _applicationDbContext.Quizzes
                .Select(q => new
                {
                    q.id,
                    q.Question,
                    q.Options,
                    q.Point
                })
                .ToListAsync();

            var userquiz = await _applicationDbContext.Users
                .Select(q => new
                {
                    q.secondsSpendOnQuiz
                })
                .ToListAsync();

            var combinedData = new
            {
                Quiz = quiz,
                UserQuiz = userquiz
            };

            return Ok(combinedData);
        }
           
    }


}

