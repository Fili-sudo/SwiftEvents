using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SwiftEvents.API.DTOs;
using SwiftEvents.Application.Commands.Tables;
using SwiftEvents.Application.Queries.Tables;
using SwiftEvents.Application.Requests.Tables;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TableController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public TableController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet("GetAllTablesForEventId/{eventId}")]
        public async Task<IActionResult> GetAllTablesForEventId([FromRoute] Guid eventId)
        {
            var query = new GetAllTablesForEventQuery(eventId);
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<List<TableGetDto>>(result);
            return Ok(mappedResult);
        }

        [HttpGet("GetAllTablesForEventIdAnonymus/{eventId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllTablesForEventIdAnonymus([FromRoute] Guid eventId)
        {
            var query = new GetAllTablesForEventQuery(eventId);
            var result = await _mediator.Send(query);
            var mappedResult = _mapper.Map<List<TableWithSummaryGuestsGetDto>>(result);
            return Ok(mappedResult);
        }

        [HttpGet("GetSparsedTablesForEvent/{eventId}")]
        public async Task<IActionResult> GetSparsedTablesForEvent([FromRoute] Guid eventId)
        {
            var query = new GetSparsedTablesForEventQuery(eventId);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpDelete("DeleteTableById/{tableId}")]
        public async Task<IActionResult> DeleteTableById([FromRoute] Guid tableId)
        {
            var command = new DeleteTableCommand(tableId);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPost("AddSingleTable")]
        public async Task<IActionResult> AddSingleTable([FromBody] TablePostDto tablePostDto)
        {
            var table = _mapper.Map<Table>(tablePostDto);
            var command = new AddSingleTableCommand(table);
            try
            {
                var result = await _mediator.Send(command);
                var mappedResult = _mapper.Map<TableGetDto>(result);
                return Ok(mappedResult);
            }
            catch (DbUpdateException e) when (e.InnerException is SqlException sqlException)
            {
                return BadRequest(sqlException.Message);
            }
        }

        [HttpPost("AddRecommendedRangeOfTables")]
        public async Task<IActionResult> AddRecommendedRangeOfTables([FromBody] TableRangePostDto tableRangePostDto)
        {
            var command = new AddRecommendedRangeTablesCommand(tableRangePostDto.EventId, tableRangePostDto.Request);
            try
            {
                var result = await _mediator.Send(command);
                var mappedResult = _mapper.Map<List<TableGetDto>>(result);
                return Ok(mappedResult);
            }
            catch (DbUpdateException e) when (e.InnerException is SqlException sqlException)
            {
                return BadRequest(sqlException.Message);
            }
        }

        [HttpGet("GetPercentageOfFullness/{eventId}")]
        public async Task<IActionResult> GetPercentageOfFullness([FromRoute] Guid eventId)
        {
            var query = new GetPercentageFulledTablesQuery(eventId);
            var result = await _mediator.Send(query);
            return Ok(result);
        }



    }
}
