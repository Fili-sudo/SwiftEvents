using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.API.DTOs;
using SwiftEvents.Application.Commands.Events;
using SwiftEvents.Application.Queries.Events;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EventController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public EventController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("CreateEventForUser")]
        public async Task<IActionResult> CreateEventForUser([FromBody] EventPostDto eventPutDto, [FromQuery] int noOfGuests, [FromQuery] bool sendMail)
        {
            var domainEvent = _mapper.Map<Event>(eventPutDto);
            var command = new CreateNewEventForUserCommand(domainEvent, noOfGuests, sendMail);
            try
            {
                var result = await _mediator.Send(command);
                var mappedResult = _mapper.Map<EventGetDto>(result);
                return new OkObjectResult(mappedResult);
            }
            catch (DbUpdateException e) when (e.InnerException is SqlException sqlException)
            {
                return BadRequest(sqlException.Message);
            }

        }

        [HttpGet]
        [Route("GetEventForUser/{userId}")]
        public async Task<IActionResult> GetEventForUser([FromRoute] Guid userId)
        {
            var query = new GetEventsForUserQuery(userId);
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<List<EventGetDto>>(result);
            return new OkObjectResult(mappedResult);
        }

        [HttpDelete]
        [Route("{eventId}")]
        public async Task<IActionResult> DeleteEventById([FromRoute] Guid eventId)
        {
            var command = new DeleteEventByIdCommand(eventId);
            var result = await _mediator.Send(command);
            if (result == null)
            {
                return BadRequest("Event to be deleted doesn't exist");
            }
            var mappedResult = _mapper.Map<EventGetDto>(result);
            return new OkObjectResult(mappedResult);

        }

        [HttpGet]
        [Route("GetEventById/{eventId}")]
        public async Task<IActionResult> GetEventById([FromRoute] Guid eventId)
        {
            var query = new GetEventByIdQuery(eventId);
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<EventGetDto>(result);
            return new OkObjectResult(mappedResult);

        }

    }
}
