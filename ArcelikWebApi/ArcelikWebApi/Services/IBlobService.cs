using System;
using ArcelikWebApi.Models;

namespace ArcelikWebApi.Services
{
	public interface IBlobService
	{
        Task<string> Upload(IFormFile fileUpload);
    }
}

