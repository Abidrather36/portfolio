using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs;
using Portfolio.Application.Services;
using Portfolio.Domain.Entities;

namespace Portfolio.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly ContactService _contactService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(ContactService contactService, ILogger<ContactController> logger)
    {
        _contactService = contactService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> SubmitContactForm([FromBody] ContactRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var message = new ContactMessage
            {
                Name = request.Name,
                Email = request.Email,
                Subject = request.Subject,
                Message = request.Message
            };

            await _contactService.ProcessContactRequestAsync(message);
            
            return Ok(new { Message = "Email sent successfully." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending contact email.");
            return StatusCode(500, new { Error = "An error occurred while sending the email." });
        }
    }
}
