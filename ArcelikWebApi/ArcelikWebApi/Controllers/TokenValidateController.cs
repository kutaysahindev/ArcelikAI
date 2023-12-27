using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Linq.Expressions;

namespace ArcelikDeneme.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenValidateController : ControllerBase
    {
        private readonly IConfigurationManager<OpenIdConnectConfiguration> _configurationManager;
        private readonly ILogger<TokenValidateController> _logger;

        public TokenValidateController(
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
            ILogger<TokenValidateController> logger)
        {
            _configurationManager = configurationManager;
            _logger = logger;
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateToken()
        {
            try
            {
                var issuer = "https://dev-36035985.okta.com/oauth2/default";

                var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                    issuer + "/.well-known/oauth-authorization-server",
                    new OpenIdConnectConfigurationRetriever(),
                    new HttpDocumentRetriever());

                var accessToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                // Console.Write(accessToken);

                // kutay'ın developer hesabındaki deneme@ hesabının accessToken
                // var accessToken = "eyJraWQiOiI5ajZacV9ORkhFY3MxajJWbHBYMlE4aDhtVW54Q0tBTWFvZ3pwZG9KQ0ljIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlM2aGxfTUdnZDZpVGRrZ1B1WVIzVTAxdVZzRlduSGZqVHUtS01zd1R4RWsiLCJpc3MiOiJodHRwczovL2Rldi0xNjQyMDEwOC5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE3MDMxNDEwODYsImV4cCI6MTcwMzE0NDY4NiwiY2lkIjoiMG9hZHJvaTI3YnZlaE1zOE01ZDciLCJ1aWQiOiIwMHVkczY3b2s5d0NDVmhGODVkNyIsInNjcCI6WyJwcm9maWxlIiwiZW1haWwiLCJvcGVuaWQiXSwiYXV0aF90aW1lIjoxNzAzMTQxMDgzLCJzdWIiOiJkZW5lbWVAMTIzLmNvbSJ9.A2oxErs7XpchAmLeav9ZHt0SRC_on2GNiM4Iw0vFXkPXHheKPngWyFVCZGAE9WDw_VHqM7AOWL_Z8Ckotp8PEFvDwa2HY8dTfIJChgt-UsEyVl7LW3Tbj2iqdxol28cKopg79U5ipV6_3tuNZC56_POCs3rFMIMXHetuaUR4dnXNW9tuuuNWKRox_EJ6P1NhBm-wSpeBcaeoLpFRAWn-twXCsg79gsFkT7XdP1zKS4AEnY9MpdSn8rkCBGgg1MVQNUl3S0yr6frJENrczglI7c0cWG3L-BB1iPUnrR15BggLlxzOQ-P3yzHtQrcZAcNdXRcCVDkOA6Ns2ZY0d2I5zg";

                var validatedToken = await ValidateToken(accessToken, issuer, configurationManager);

                if (validatedToken == null)
                {
                    _logger.LogError("Token invalid(log)");

                    // Return 401 status code to indicate unauthorized

                    return Unauthorized(new { message = "Token validation failed" });
                }

                _logger.LogInformation("Token validation successful.(log)");

                // return statement here

                return Ok("Token validation successful.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during token validation: {ErrorMessage}", ex.Message);

                return StatusCode(500, new { message = "Internal Server Error" });
            }
        }
        private async Task<JwtSecurityToken> ValidateToken(
            string token,
            string issuer,
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager)
        {
            if (string.IsNullOrEmpty(token)) throw new ArgumentNullException(nameof(token));
            if (string.IsNullOrEmpty(issuer)) throw new ArgumentNullException(nameof(issuer));

            var discoveryDocument = await configurationManager.GetConfigurationAsync(CancellationToken.None);
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
                // ClockSkew = TimeSpan.FromMinutes(2),
                ValidateAudience = true,
                ValidAudience = "api://default"
            };

            try
            {
                var principal = new JwtSecurityTokenHandler()
                    .ValidateToken(token, validationParameters, out var rawValidatedToken);

                return (JwtSecurityToken)rawValidatedToken;
            }
            //error catch
            catch (SecurityTokenValidationException ex)
            {
                // Logging, etc.
                _logger.LogError(ex, "Token validation failed: {ErrorMessage}", ex.Message);

                return null;
            }
        }
    }
}
