using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class UserPostDtoProfile : Profile
    {
        public UserPostDtoProfile()
        {
            CreateMap<UserPostDto, User>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Mail, opt => opt.MapFrom(src => src.Mail));
        }
    }
}
