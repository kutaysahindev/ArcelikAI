using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace ArcelikWebApi.Middlewares
{
    public class TokenValidationMiddleware : IMiddleware
    {
        private readonly IConfigurationManager<OpenIdConnectConfiguration> _configurationManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<TokenValidationMiddleware> _logger;

        public TokenValidationMiddleware(
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
            IConfiguration configuration,
            ILogger<TokenValidationMiddleware> logger)
        {
            _configurationManager = configurationManager;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var accessToken = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var issuer = _configuration["Authentication:Okta:Issuer"];

            var validatedToken = await ValidateToken(accessToken, issuer, _configurationManager, context);

            if (validatedToken == null)
            {
                _logger.LogError("Token validation failed");
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Token validation failed");
                return;
            }

            // Accessing the claims from the validated token
            var userEmailClaim = validatedToken.Claims.FirstOrDefault(c => c.Type == "sub");
            var userRoleClaim = validatedToken.Claims.FirstOrDefault(c => c.Type == "userRole");

            if (userEmailClaim != null && !string.IsNullOrEmpty(userEmailClaim.Value))
            {
                var userEmail = userEmailClaim.Value;

                // Attach user email to the request
                context.Items["UserEmail"] = userEmail;
            }

            if (userRoleClaim != null && !string.IsNullOrEmpty(userRoleClaim.Value))
            {
                var userRole = userRoleClaim.Value;

                // Attach user role to the request
                context.Items["UserRole"] = userRole;
            }

            // Call the next middleware in the pipeline
            await next(context);
        }

        private async Task<JwtSecurityToken> ValidateToken(
            string token,
            string issuer,
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
            HttpContext context)
        {
            if (string.IsNullOrEmpty(token)) throw new ArgumentNullException(nameof(token));
            if (string.IsNullOrEmpty(issuer)) throw new ArgumentNullException(nameof(issuer));

            var discoveryDocument = await configurationManager.GetConfigurationAsync(default);
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
                ValidateAudience = true,
                ValidAudience = _configuration["Authentication:Okta:Audience"]
            };

            try
            {
                var principal = new JwtSecurityTokenHandler()
                    .ValidateToken(token, validationParameters, out var rawValidatedToken);

                return (JwtSecurityToken)rawValidatedToken;
            }
            catch (SecurityTokenException ex)
            {
                _logger.LogError(ex, "Token validation failed: {ErrorMessage}", ex.Message);

                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid token.");

                return null;
            }
        }
    }
}
