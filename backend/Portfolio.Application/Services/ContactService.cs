using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Services;

public class ContactService
{
    private readonly IEmailService _emailService;

    public ContactService(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public async Task ProcessContactRequestAsync(ContactMessage message)
    {
        // Add business validation here if necessary
        if (string.IsNullOrWhiteSpace(message.Email) || string.IsNullOrWhiteSpace(message.Message))
        {
            throw new ArgumentException("Email and Message are required.");
        }

        
        await _emailService.SendContactEmailAsync(message);
    }
}
