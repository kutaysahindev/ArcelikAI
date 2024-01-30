using System;
using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
	public class ApplicationSettings
	{
		[Key]
		public int id { get; set; }
		public string LandingUrl { get; set; }
		public string SupportedFileTypes { get; set; }
	}
}

