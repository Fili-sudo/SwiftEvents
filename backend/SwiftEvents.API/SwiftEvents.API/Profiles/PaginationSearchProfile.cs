using AutoMapper;
using SwiftEvents.API.Helpers;
using SwiftEvents.Application.Requests;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class PaginationSearchProfile : Profile
    {
        public PaginationSearchProfile()
        {
            CreateMap<PaginationSearchRequest, PaginationSearchFilter>()
            .ForMember(dest => dest.PageNumber, action => action.MapFrom(source => PaginationHelper.CheckDefaultPageNumber(source.PageNumber)))
            .ForMember(dest => dest.PageSize, action => action.MapFrom(source => PaginationHelper.CheckMaxPageSize(source.PageSize)))
            .ForMember(dest => dest.TotalRows, action => action.MapFrom(source => 1))
            .ForMember(dest => dest.Search, action => action.MapFrom(source => source.Search));
        }
    }
}
