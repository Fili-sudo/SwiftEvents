using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.DTOs
{
    public class UploadedFileGetDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public DateTime DateCreated { get; set; }
        public string AbsoluteUri { get; set; }
        public Guid EventId { get; set; }
    }
}
