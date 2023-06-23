using SendGrid.Helpers.Mail;
using SendGrid;
using SwiftEvents.Application.Configurations;
using SwiftEvents.Application.Services.SendGridServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Services.SendGridServices
{
    public class SendGridService : ISendGridService
    {
        public SendGridService(SendGridConfiguration sendGridConfiguration)
        {
            SendGridConfiguration = sendGridConfiguration;
        }

        public SendGridConfiguration SendGridConfiguration { get; }
        public async Task SendMail(string to, string subject, string? plainTextContent, string? htmlContent)
        {
            var apiKey = SendGridConfiguration.ApiKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(SendGridConfiguration.EmailFrom, "SwiftEvents");
            var subjectToSend = subject;
            var toSend = new EmailAddress(to);
            var plainTextContentToSend = plainTextContent;
            var htmlContentToSend = htmlContent;
            var msg = MailHelper.CreateSingleEmail(from, toSend, subjectToSend, plainTextContentToSend, htmlContentToSend);
            var response = await client.SendEmailAsync(msg);
            
        }
    }
}
