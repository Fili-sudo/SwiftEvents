using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class TableGetDtoProfile : Profile
    {
        public TableGetDtoProfile()
        {
            CreateMap<Table, TableGetDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.TableNumber, opt => opt.MapFrom(src => src.TableNumber))
                .ForMember(dest => dest.NoOfSeats, opt => opt.MapFrom(src => src.NoOfSeats))
                .ForMember(dest => dest.EventId, opt => opt.MapFrom(src => src.EventId))
                .ForMember(dest => dest.Guests, opt => opt.MapFrom(src => src.Guests));
        }
    }
}
