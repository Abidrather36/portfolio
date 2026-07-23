using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Infrastructure.Configuration;

namespace Portfolio.Infrastructure.Services;

public class GmailSmtpEmailService : IEmailService
{
    private readonly SmtpSettings _smtpSettings;

    public GmailSmtpEmailService(IOptions<SmtpSettings> smtpSettings)
    {
        _smtpSettings = smtpSettings.Value;
    }

    public async Task SendContactEmailAsync(ContactMessage message)
    {
        using var client = new SmtpClient(_smtpSettings.Server, _smtpSettings.Port)
        {
            Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(_smtpSettings.Username, "Portfolio Contact Form"),
            Subject = $"New Contact Submission: {message.Subject}",
            Body = $"<strong>Name:</strong> {message.Name}<br/>" +
                   $"<strong>Email:</strong> {message.Email}<br/><br/>" +
                   $"<strong>Message:</strong><br/>{message.Message.Replace("\n", "<br/>")}",
            IsBodyHtml = true
        };

        // Send to your own email address (configured in Username)
        mailMessage.To.Add(_smtpSettings.Username);
        
        // Reply-to sender's email
        if (!string.IsNullOrWhiteSpace(message.Email))
        {
            mailMessage.ReplyToList.Add(new MailAddress(message.Email, message.Name));
        }

        await client.SendMailAsync(mailMessage);
    }
}
