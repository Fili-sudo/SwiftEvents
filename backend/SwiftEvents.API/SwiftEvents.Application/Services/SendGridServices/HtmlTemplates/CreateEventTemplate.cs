using SwiftEvents.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwiftEvents.Application.Services.SendGridServices.HtmlTemplates
{
    public class CreateEventTemplate
    {
        public static string GetHtmlTemplate(Event @event, string mail)
        {
            var htmlContent = new StringBuilder("Thank you for using the SwiftEvents app and for choosing to receive this email. <br> Below are your event's brief information:<br>");
            htmlContent.Append($"<strong> Name </strong> <br> {@event.Name} <br>");
            htmlContent.Append($"<strong> Description </strong> <br> {@event.Description} <br>");
            htmlContent.Append($"<strong> Location </strong> <br> {@event.Location} <br>");
            htmlContent.Append($"<strong> Date </strong> <br> {@event.Date} <br>");

            return htmlContent.ToString();
        }
    }
}
