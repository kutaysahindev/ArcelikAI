using ArcelikWebApi.Data;
using ArcelikWebApi.Middlewares;
using ArcelikWebApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Newtonsoft.Json.Serialization;
using MySql.Data;
using Azure.Storage.Blobs;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSingleton<IConfigurationManager<OpenIdConnectConfiguration>>(provider =>
{
    var issuer = builder.Configuration["Authentication:Okta:Issuer"];
    var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
        builder.Configuration["Authentication:Okta:ApiAuthorizationServer"],
        new OpenIdConnectConfigurationRetriever(),
    new HttpDocumentRetriever()); ;
    return configurationManager;
});

builder.Services.AddScoped(_ =>
{
    return new BlobServiceClient(builder.Configuration.GetConnectionString("AzureBlobStorage"));
});

builder.Services.AddScoped<IBlobService, BlobService>();

builder.Services.AddScoped<TokenValidationMiddleware>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin",
        options => options
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyMethod());
});

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver =
    new DefaultContractResolver());


builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(
    builder.Configuration["ConnectionStrings:DefaultConnection"],
    ServerVersion.AutoDetect(builder.Configuration["ConnectionStrings:DefaultConnection"])
));


var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<TokenValidationMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
