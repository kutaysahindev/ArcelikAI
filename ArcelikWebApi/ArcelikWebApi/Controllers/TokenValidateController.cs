using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenValidateController : ControllerBase
    {
        private readonly IConfigurationManager<OpenIdConnectConfiguration> _configurationManager;

        public TokenValidateController(IConfigurationManager<OpenIdConnectConfiguration> configurationManager)
        {
            _configurationManager = configurationManager;
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateToken(CancellationToken ct = default(CancellationToken))
        {
            var issuer = "https://dev-36035985.okta.com/oauth2/default";

            var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
            issuer + "/.well-known/oauth-authorization-server",
            new OpenIdConnectConfigurationRetriever(),
            new HttpDocumentRetriever());

            var accessToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "") + "asdsadas";

            Console.Write(accessToken);            //var accessToken = "eyJraWQiOiJOVmptSFJtcFBsQXFoTFR5VkthbWlIYTktNTFMQTlXRGRhX1dHTy1QRkcwIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmpFVXBpSU82YnlIWk1WV3ltbjVTT0hTTnpZT1V1emQ1RlpwUWoxMXlORWciLCJpc3MiOiJodHRwczovL2Rldi0zNjAzNTk4NS5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE3MDI5MDM0NjksImV4cCI6MTcwMjkwNzA2OSwiY2lkIjoiMG9hZHJ1NTR6bEFNQkU1OG41ZDciLCJ1aWQiOiIwMHVkemFqeW4yN09HZllOQTVkNyIsInNjcCI6WyJwcm9maWxlIiwib3BlbmlkIiwiZW1haWwiXSwiYXV0aF90aW1lIjoxNzAyOTAzNDY3LCJzdWIiOiJhZG1pbkB0ZXN0LmNvbSJ9.fFTpwXARjMnsod7c-s6YURCrPe-fgBLnJvHptDUvs9f056VG_mL37a0lCmzfns-NurATXJjvYV0G4LcU-9R7AvqWJmqD3b3TXlQCz05T_tz3VfL8dnlPAXokrBjSWyugqFsofLh-8r93VFmri38FvWBZjsfE4-VJ-QgbpNPVQvVYL_sClgT9hq45_C_hC6mZAeRts2an_4kZKz3k_r5vwqE5Q8neD6y8qpOzFd0jCwIwuV9cidATpxpS7f6-IbWPJveKp3T9e7lre9hSLJD_YE571hHJIIm2wsIX6kJ51BmD42Ft0uWdq0Qf_cBR23VaSuPykarl27dFLRLa-fXLvw";

            var validatedToken = await ValidateToken(accessToken, issuer, configurationManager);

            if (validatedToken == null)
            {
                Console.WriteLine("Invalid token");
                //Sign out function
            }
            else
            {
                // Additional validation...
                Console.WriteLine("Token is valid!");
            }

            // Add a return statement here
            return Ok("Token validation completed.");
        }

        private static async Task<JwtSecurityToken> ValidateToken(
            string token,
            string issuer,
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
            CancellationToken ct = default(CancellationToken))
        {
            if (string.IsNullOrEmpty(token)) throw new ArgumentNullException(nameof(token));
            if (string.IsNullOrEmpty(issuer)) throw new ArgumentNullException(nameof(issuer));

            var discoveryDocument = await configurationManager.GetConfigurationAsync(ct);
            var signingKeys = discoveryDocument.SigningKeys;

            var validationParameters = new TokenValidationParameters
            {
                RequireExpirationTime = true,
                RequireSignedTokens = true,
                ValidateIssuer = true,
                ValidIssuer = issuer,
                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = signingKeys,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(2),
                ValidateAudience = true,
                ValidAudience = "api://default"
            };

            try
            {
                var principal = new JwtSecurityTokenHandler()
                    .ValidateToken(token, validationParameters, out var rawValidatedToken);

                return (JwtSecurityToken)rawValidatedToken;
            }
            catch (SecurityTokenValidationException)
            {
                // Logging, etc.
                return null;
            }
        }
    }
}

