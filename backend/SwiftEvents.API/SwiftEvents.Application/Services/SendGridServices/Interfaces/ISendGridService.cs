
using SendGrid;
using SwiftEvents.Application.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Services.SendGridServices.Interfaces
{
    public interface ISendGridService
    {
        SendGridConfiguration SendGridConfiguration { get; }
        Task SendMail(string to, string subject, string? plainTextContent, string? htmlContent);
    }
}
