using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using static System.Net.WebRequestMethods;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArcelikWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenValidateController : ControllerBase
    {
        private readonly IConfigurationManager<OpenIdConnectConfiguration> _configurationManager;
        private readonly ILogger<TokenValidateController> _logger;
        private readonly IConfiguration _configuration;

        public TokenValidateController(
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
            IConfiguration configuration,
            ILogger<TokenValidateController> logger)

        {
            _configurationManager = configurationManager;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateToken()
        {
            var issuer = _configuration["Authentication:Okta:Issuer"];

            var accessToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");


            var validatedToken = await ValidateToken(accessToken, issuer, _configurationManager);


            if (validatedToken == null)
            {
                return Unauthorized(new { message = "Token validation failed" });
            }

            return Ok("Token validation completed.");

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
                ValidAudience = _configuration["Authentication:Okta:Audience"]
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