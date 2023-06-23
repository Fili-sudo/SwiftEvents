using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class GuestGetForTableProfile : Profile
    {
        public GuestGetForTableProfile()
        {
            CreateMap<Guest, GuestGetForTable>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber));
        }
    }
}
