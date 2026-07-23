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

        string emailHtml = $@"
                <div style='font-family: ""Inter"", ""Segoe UI"", Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f; color: #ffffff; padding: 40px 20px;'>
                    <div style='max-width: 600px; margin: 0 auto; background-color: #12121a; border-radius: 16px; border: 1px solid #2a2a35; border-top: 4px solid #06b6d4; overflow: hidden; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);'>
                        <div style='padding: 32px;'>
                            <h2 style='margin-top: 0; margin-bottom: 24px; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;'>New Message</h2>
                            
                            <div style='margin-bottom: 20px;'>
                                <p style='margin: 0 0 6px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;'>Name</p>
                                <p style='margin: 0; font-size: 16px; color: #ffffff;'>{message.Name}</p>
                            </div>

                            <div style='margin-bottom: 20px;'>
                                <p style='margin: 0 0 6px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;'>Email</p>
                                <p style='margin: 0; font-size: 16px;'>
                                    <a href='mailto:{message.Email}' style='color: #0ea5e9; text-decoration: none;'>{message.Email}</a>
                                </p>
                            </div>

                            <div style='margin-bottom: 30px;'>
                                <p style='margin: 0 0 6px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;'>Subject</p>
                                <p style='margin: 0; font-size: 16px; color: #ffffff; font-weight: 500;'>{message.Subject}</p>
                            </div>

                            <div style='background-color: #1a1a24; border: 1px solid #2a2a35; border-radius: 12px; padding: 24px;'>
                                <p style='margin: 0 0 12px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;'>Message</p>
                                <p style='margin: 0; font-size: 15px; color: #ffffff; line-height: 1.7;'>
                                    {message.Message.Replace("\n", "<br/>")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p style='text-align: center; color: #64748b; font-size: 13px; margin-top: 24px; font-weight: 500;'>
                        Sent from your Portfolio
                    </p>
                </div>
            ";

        var mailMessage = new MailMessage
        {
            From = new MailAddress(_smtpSettings.Username, "Portfolio Contact Form"),
            Subject = $"New Contact Submission: {message.Subject}",
            Body = emailHtml,
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
