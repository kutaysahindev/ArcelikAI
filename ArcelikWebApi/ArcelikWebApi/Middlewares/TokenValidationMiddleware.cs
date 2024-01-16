using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;

// ... (existing using statements)

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

            //var accessToken = "eyJraWQiOiJOVmptSFJtcFBsQXFoTFR5VkthbWlIYTktNTFMQTlXRGRhX1dHTy1QRkcwIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULm1kN2VzaUNOMGV6TGlWb3dxWlFINVRFakVDVFRBQlNVRWQ3NWw2N1ZFaVUiLCJpc3MiOiJodHRwczovL2Rldi0zNjAzNTk4NS5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE3MDU0MTA0MjYsImV4cCI6MTcwNTQxNDAyNiwiY2lkIjoiMG9hZHJ1NTR6bEFNQkU1OG41ZDciLCJ1aWQiOiIwMHVkemFqeW4yN09HZllOQTVkNyIsInNjcCI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiXSwiYXV0aF90aW1lIjoxNzA1NDEwNDI1LCJzdWIiOiJhZG1pbkB0ZXN0LmNvbSJ9.UQJ8aemgNj3uk2CZW0hsWBBbhZCyK-A9jCfaczFPfqyfoxSVwONBIQkxXnyFa_MTTF9TXn2AFes4H9DRARckdl7QDilWMyW4d3BigJTHEQDVmdpEFWc7LiKElg3ifEFm9vjEIwCdmh89OgvgQShsj4EQdkBpcUSaVLXEwhT2ZChC29foXy-6DkdM2NcLgfeG111s34AG-rxQuLYAjakA7U0KOL4Awa3SXGdi4970moIuWUfTkcmmnQqcV5VuY1QypXd9A6TlEjYHCME2Sv3mBTO9qxGhJZMwvwVLEY0YUqAxcTDtYjSe-Zoyvqp39aJqvz9wgXnsH66aIPI0lNzh5Q";

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

            if (userEmailClaim != null && !string.IsNullOrEmpty(userEmailClaim.Value))
            {

                var userEmail = userEmailClaim.Value;

                // Attach user email to the request
                context.Items["UserEmail"] = userEmail;

            }

            context.Response.StatusCode = 200;
            await next(context);
        }

        private async Task<JwtSecurityToken> ValidateToken(
            string token,
            string issuer,
            IConfigurationManager<OpenIdConnectConfiguration> configurationManager,
            HttpContext context)
        {
            if (string.IsNullOrEmpty(token))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Token is empty.");
                return null;
            }

            if (string.IsNullOrEmpty(issuer))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Issuer is empty.");
                return null;
            }

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
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "Token validation failed: {ErrorMessage}", ex.Message);

                if (ex.Message.Contains("IDX10503")) // Token format issue
                {
                    context.Response.StatusCode = 422;
                    await context.Response.WriteAsync("Invalid token format.");
                }
                else if (ex.Message.Contains("IDX12729")) // Token length or structure issue
                {
                    context.Response.StatusCode = 422;
                    await context.Response.WriteAsync("Invalid token structure or length.");
                }
                else
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Invalid token.");
                }

                return null;
            }
            catch (SecurityTokenValidationException ex)
            {
                _logger.LogError(ex, "Token validation failed: {ErrorMessage}", ex.Message);

                if (ex.Message.Contains("IDX10503")) // Token format issue
                {
                    context.Response.StatusCode = 422;
                    await context.Response.WriteAsync("Invalid token format.");
                }
                else if (ex.Message.Contains("IDX12729")) // Token length or structure issue
                {
                    context.Response.StatusCode = 422;
                    await context.Response.WriteAsync("Invalid token structure or length.");
                }
                else
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Invalid token.");
                }

                return null;
            }
        }
    }
}
