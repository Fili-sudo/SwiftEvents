using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.API.DTOs;
using SwiftEvents.Application.Commands.Guests;
using SwiftEvents.Application.Queries.Guests;
using SwiftEvents.Application.Requests;
using SwiftEvents.Application.Responses;
using SwiftEvents.Domain.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SwiftEvents.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GuestController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public GuestController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetGuestsForEvent/{eventId}")]
        public async Task<IActionResult> GetGuestsForEvent([FromRoute] Guid eventId, [FromQuery] PaginationRequest paginationRequest)
        {
            var paginationFilter = _mapper.Map<PaginationFilter>(paginationRequest);
            var query = new GetGuestsForEventQuery(eventId, paginationFilter);
            var result = await _mediator.Send(query);
            var mappedDataResult = _mapper.Map<List<GuestGetDto>>(result.Data);
            if (mappedDataResult.Count() > 0)
            {
                var finalResult = new PaginatedResponse<GuestGetDto>(mappedDataResult)
                {
                    TotalRows = result.TotalRows,
                    PageNumber = result.PageNumber,
                    PageSize = result.PageSize
                };
                return new OkObjectResult(finalResult);
            }
            return NotFound();
        }

        [HttpGet]
        [Route("GetGuestsForEventWithSearch/{eventId}")]
        public async Task<IActionResult> GetGuestsForEventWithSearch([FromRoute] Guid eventId, [FromQuery] PaginationSearchRequest paginationSearchRequest)
        {
            var paginationSearchFilter = _mapper.Map<PaginationSearchFilter>(paginationSearchRequest);
            var query = new GetPaginatedWithSearchGuestsForEventQuery(eventId, paginationSearchFilter);
            var result = await _mediator.Send(query);
            var mappedDataResult = _mapper.Map<List<GuestGetDto>>(result.Data);
            if (mappedDataResult.Count() > 0)
            {
                var finalResult = new PaginatedResponse<GuestGetDto>(mappedDataResult)
                {
                    TotalRows = result.TotalRows,
                    PageNumber = result.PageNumber,
                    PageSize = result.PageSize
                };
                return new OkObjectResult(finalResult);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("AddGuestsForEventRange")]
        public async Task<IActionResult> AddGuestsForEventRange([FromQuery] Guid eventId, [FromBody] List<GuestPostRangeDto> guestsList)
        {
            var guestsListDomain = _mapper.Map<List<Guest>>(guestsList);
            var command = new AddGuestsForEventRangeCommand(guestsListDomain, eventId);
            try
            {
                var result = await _mediator.Send(command);
                var mappedResult = _mapper.Map<List<GuestGetDto>>(result);
                return new OkObjectResult(mappedResult);
            }
            catch (DbUpdateException e) when (e.InnerException is SqlException sqlException)
            {
                return BadRequest(sqlException.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteGuestsRange")]
        public async Task<IActionResult> DeleteGuestsRange([FromQuery] List<Guid> guestIds)
        {
            var command = new DeleteGuestsRangeCommand(guestIds);
            var result = await _mediator.Send(command);
            var mappedResult = _mapper.Map<List<GuestGetDto>>(result);
            if (mappedResult.Count == guestIds.Count)
            {
                return new OkObjectResult(mappedResult);
            }
            return Ok($"Deleted {mappedResult.Count} Guests out of {guestIds.Count} requested");
        }

        [HttpPut]
        [Route("UpdateGuestsRange")]
        public async Task<IActionResult> UpdateGuestsRange([FromBody] List<GuestPutRangeDto> guests)
        {
            var guestsToUpdate = _mapper.Map<List<Guest>>(guests);
            var command = new UpdateGuestsRangeCommand(guestsToUpdate);
            try
            {
                var result = await _mediator.Send(command);
                var mappedResult = _mapper.Map<List<GuestGetDto>>(result);
                return new OkObjectResult(mappedResult);
            }
            catch (DbUpdateException e) when (e.InnerException is SqlException sqlException)
            {
                return BadRequest(sqlException.Message);
            }
            catch (DbUpdateConcurrencyException e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPatch]
        [Route("PatchGuestTableAnonymous")]
        [AllowAnonymous]
        public async Task<IActionResult> PatchGuestTableAnonymous([FromBody] GuestTablePatchDto patchDto)
        {
            var command = new PatchGuestTableCommand(patchDto.GuestId, patchDto.TableId);
            var result = await _mediator.Send(command);
            return result ? NoContent() : BadRequest();
        }

        [HttpPatch]
        [Route("PatchGuestAnonymous")]
        [AllowAnonymous]
        public async Task<IActionResult> PatchGuestAnonymous([FromBody] GuestPacthDto patchDto)
        {
            var command = new PatchGuestCommand(patchDto.GuestId, patchDto.Name, patchDto.PhoneNumber);
            var result = await _mediator.Send(command);
            return result ? NoContent() : BadRequest();
        }

        [HttpPatch("UnsignGuestFromTable/{guestId}")]
        public async Task<IActionResult> UnsignGuestFromTable([FromRoute] Guid guestId)
        {
            var command = new UnsignGuestFromTableCommand(guestId);
            var result = await _mediator.Send(command);
            return result != null ? NoContent() : NotFound();
        }

        [HttpGet("GetGuestById/{guestId}")]
        public async Task<IActionResult> GetGuestById([FromRoute] Guid guestId)
        {
            var query = new GetGuestByIdQuery(guestId);
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<GuestGetDto>(result);
            return Ok(mappedResult);
        }

        [HttpGet("GetGuestByIdAnonymus/{guestId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetGuestByIdAnonymus([FromRoute] Guid guestId)
        {
            var query = new GetGuestByIdDetailedQuery(guestId);
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<GuestDetailedGetDto>(result);
            return Ok(mappedResult);
        }
    }
}
