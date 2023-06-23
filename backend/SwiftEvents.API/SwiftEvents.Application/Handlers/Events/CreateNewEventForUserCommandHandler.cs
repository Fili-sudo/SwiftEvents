using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SwiftEvents.Application.Commands.Events;
using SwiftEvents.Application.Services.SendGridServices.HtmlTemplates;
using SwiftEvents.Application.Services.SendGridServices.Interfaces;
using SwiftEvents.Data_Access;
using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace SwiftEvents.Application.Handlers.Events
{
    public class CreateNewEventForUserCommandHandler : IRequestHandler<CreateNewEventForUserCommand, Event>
    {
        private readonly AppDbContext _context;
        private readonly ISendGridService _sendGridService;

        public CreateNewEventForUserCommandHandler(AppDbContext context, ISendGridService sendGridService)
        {
            _context = context;
            _sendGridService = sendGridService;
        }

        public async Task<Event> Handle(CreateNewEventForUserCommand command, CancellationToken cancellationToken)
        {
            

            await _context.Events.AddAsync(command.Event);
            var guests = CreateGuests(command.NoOfGuests, command.Event.Id);
            await _context.Guests.AddRangeAsync(guests);
            await _context.SaveChangesAsync();

            if (command.SendMail)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == command.Event.UserId);
                await SendMailWithSendGrid(command.Event, user.Mail);
            }

            return await Task.FromResult(command.Event);
            
        }
        private List<Guest> CreateGuests(int noOfGuests, Guid eventId)
        {
            List<Guest> guests = new List<Guest>();
            for (int i = 1; i <= noOfGuests; i++)
            {
                guests.Add(new Guest { EventId = eventId });
            }
            return guests;
        }

        private async Task SendMailWithSendGrid(Event @event, string mail)
        {
            var htmlContent = CreateEventTemplate.GetHtmlTemplate(@event, mail);
            await _sendGridService.SendMail(mail, "Event Creation confirmation", null, htmlContent);
        }
    }
}
