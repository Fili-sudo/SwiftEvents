using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class GuestPostRangeDtoProfile : Profile
    {
        public GuestPostRangeDtoProfile()
        {
            CreateMap<GuestPostRangeDto, Guest>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.TableId, opt => opt.MapFrom(src => src.TableId))
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.EventId, opt => opt.Ignore())
                .ForMember(dest => dest.Event, opt => opt.Ignore())
                .ForMember(dest => dest.Table, opt => opt.Ignore());
        }
    }
}
