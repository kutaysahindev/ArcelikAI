using System;
using System.ComponentModel.DataAnnotations;

namespace ArcelikWebApi.Models
{
	public class TestClass
	{
		[Key]
		public int keyAttribute { get; set; }

		public int firstAttribute { get; set; }

		public int secondAttribute { get; set; }
	
    }
}

