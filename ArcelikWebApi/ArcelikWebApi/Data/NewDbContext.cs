using System;
using ArcelikWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ArcelikWebApi.Data
{
	public class NewDbContext : DbContext
	{
		public NewDbContext(DbContextOptions<NewDbContext> options) : base(options)
		{

		}

		
	}
}

