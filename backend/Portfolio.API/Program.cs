using Portfolio.Application.Interfaces;
using Portfolio.Application.Services;
using Portfolio.Infrastructure.Configuration;
using Portfolio.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure SMTP Settings
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));

// Dependency Injection
builder.Services.AddScoped<IEmailService, GmailSmtpEmailService>();
builder.Services.AddScoped<ContactService>();

// CORS Setup
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowPortfolioApp", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowPortfolioApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
