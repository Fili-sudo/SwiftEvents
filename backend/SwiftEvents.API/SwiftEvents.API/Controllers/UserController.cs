using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwiftEvents.API.DTOs;
using SwiftEvents.Application.Commands.Users;
using SwiftEvents.Application.Queries.Users;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public UserController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] Guid id)
        {
            var query = new GetUsersByIdQuery(id);
            var result = await _mediator.Send(query);
            if(result == null)
            {
                return NotFound();
            }
            var mappedResult = _mapper.Map<UserGetDto>(result);
            return Ok(mappedResult);
        }

        [HttpGet]
        [Route("GetUserByMail/{mail}")]
        public async Task<IActionResult> GetUserByMail([FromRoute] string mail)
        {
            var query = new GetUserByMailQuery(mail);
            var result = await _mediator.Send(query);
            if (result == null)
            {
                return NotFound();
            }
            var mappedResult = _mapper.Map<UserGetDto>(result);
            return Ok(mappedResult);
        }

        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserPostDto userPostDto)
        {
            var user = _mapper.Map<User>(userPostDto);
            var command = new CreateUserCommand(user);
            var result = await _mediator.Send(command);
            var mappedResult = _mapper.Map<UserGetDto>(result);
            return new OkObjectResult(mappedResult);
        }

        [HttpPost]
        [Route("CreateUserWithoutGuid")]
        public async Task<IActionResult> CreateUserWithoutGuid([FromBody] UserWithoutGuidPostDto userPostDto)
        {
            var user = _mapper.Map<User>(userPostDto);
            var command = new CreateUserWithoutGuidCommand(user);
            var result = await _mediator.Send(command);
            var mappedResult = _mapper.Map<UserGetDto>(result);
            return new OkObjectResult(mappedResult);
        }
    }
}
