using System;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System.IdentityModel.Tokens.Jwt;

namespace ArcelikWebApi.Middlewares
{
    public class TokenValidationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;
        private readonly ILogger<TokenValidationMiddleware> _logger;

        public TokenValidationMiddleware(
            RequestDelegate next,
            IConfiguration configuration,
            ILogger<TokenValidationMiddleware> logger)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var issuer = _configuration["Authentication:Okta:Issuer"];
            var audience = _configuration["Authentication:Okta:Audience"];

            var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
                $"{issuer}/.well-known/oauth-authorization-server",
                new OpenIdConnectConfigurationRetriever(),
                new HttpDocumentRetriever());

            var accessToken = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            var validatedToken = await ValidateToken(accessToken, issuer, configurationManager, audience);

            if (validatedToken == null)
            {
                _logger.LogWarning("Token invalid");
                context.Response.StatusCode = 401; // Unauthorized
                return;
            }

            // Extract user information from the validated token
            var userId = validatedToken.Subject;
            var userEmail = validatedToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;

            // You can now use userId and userEmail as needed in your application

            // Call the next middleware in the pipeline
            await _next(context);
        }

        private async Task<JwtSecurityToken> ValidateToken(
            string token,
            string issuer,
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
            string audience)
        {
            // Token validation logic (similar to your ValidateToken method)
            // ...

            return null; // Return the validated token or null if validation fails
        }
    }
}

