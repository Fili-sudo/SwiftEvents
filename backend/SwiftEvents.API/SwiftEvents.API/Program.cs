using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web;
using SwiftEvents.Application;
using SwiftEvents.Application.Configurations;
using SwiftEvents.Application.Services.BloblServices.Interfaces;
using SwiftEvents.Application.Services.BlobServices;
using SwiftEvents.Application.Services.SendGridServices.Interfaces;
using SwiftEvents.Application.Services.SendGridServices;
using SwiftEvents.Data_Access;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Markup).Assembly));
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowOrigin",
        builder =>
        {
            builder.WithOrigins(config["CORSOrigin:Domain"])
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(config.GetConnectionString("Cstring"));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(config, "AzureAd");

var blobConfig = config
            .GetSection("AzureBlobConfiguration")
            .Get<AzureBlobConfiguration>();
builder.Services.AddSingleton(blobConfig);
builder.Services.AddScoped<IBlobService, BlobService>();

var sendGridConfig = config
            .GetSection("SendGridEmailSettings")
            .Get<SendGridConfiguration>();
builder.Services.AddSingleton(sendGridConfig);
builder.Services.AddScoped<ISendGridService, SendGridService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowOrigin");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
