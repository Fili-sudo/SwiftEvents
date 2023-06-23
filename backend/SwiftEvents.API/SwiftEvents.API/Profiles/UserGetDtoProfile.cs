using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class UserGetDtoProfile : Profile
    {
        public UserGetDtoProfile()
        {
            CreateMap<User, UserGetDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Mail, opt => opt.MapFrom(src => src.Mail));
        }
    }
}
