using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class GuestSummaryGetDtoProfile : Profile
    {
        public GuestSummaryGetDtoProfile()
        {
            CreateMap<Guest, GuestSummaryGetDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber));
        }
    }
}
