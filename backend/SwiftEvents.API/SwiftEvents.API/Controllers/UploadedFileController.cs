using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwiftEvents.API.DTOs;
using SwiftEvents.Application.Commands.FileUpload;
using SwiftEvents.Application.Exceptions;
using SwiftEvents.Application.Queries.FileUpload;
using SwiftEvents.Application.Requests;

namespace SwiftEvents.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UploadedFileController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public UploadedFileController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadFile([FromBody] FileUploadRequest fileUploadRequest)
        {
            var command = new FileUploadCommand(fileUploadRequest);
            try
            {
                var result = await _mediator.Send(command);
                var mappedResult = _mapper.Map<UploadedFileGetDto>(result);
                return Ok(mappedResult);
            }
            catch(FileException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("DeleteFile/{uploadedFileId}")]
        public async Task<IActionResult> DeleteFile([FromRoute] Guid uploadedFileId)
        {
            var command = new DeleteFileCommand(uploadedFileId);
            var result = await _mediator.Send(command);
            return result ? NoContent() : NotFound("File not found!");
        }

        [HttpGet("GetFiles/{eventId}")]
        public async Task<IActionResult> GetFiles([FromRoute] Guid eventId)
        {
            var query = new GetUploadedFilesForEventQuery(eventId);
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<List<UploadedFileGetDto>>(result);
            return Ok(mappedResult);
        }

        [HttpGet("GetFilesAnonymous/{eventId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFilesAnonymous([FromRoute] Guid eventId)
        {
            var query = new GetUploadedFilesForEventQuery(eventId);
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<List<UploadedFileGetDto>>(result);
            return Ok(mappedResult);
        }
    }
}
