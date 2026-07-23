using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

public interface IEmailService
{
    Task SendContactEmailAsync(ContactMessage message);
}
