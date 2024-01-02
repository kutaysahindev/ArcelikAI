﻿using ArcelikWebApi.Data;
using ArcelikWebApi.Services;
using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSingleton<IConfigurationManager<OpenIdConnectConfiguration>>(provider =>
{
    var issuer = "https://dev-36035985.okta.com/oauth2/default";
    var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
        issuer + "/.well-known/oauth-authorization-server",
        new OpenIdConnectConfigurationRetriever(),
    new HttpDocumentRetriever());
    return configurationManager;
});

builder.Services.AddScoped(_ =>
{
    return new BlobServiceClient(builder.Configuration.GetConnectionString("AzureBlobStorage"));
});

builder.Services.AddScoped<IBlobService, BlobService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyMethod());
});

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver =
    new DefaultContractResolver());

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();

