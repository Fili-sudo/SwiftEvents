using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class UserWithoutGuidPostDtoProfile : Profile
    {
        public UserWithoutGuidPostDtoProfile()
        {
            CreateMap<UserWithoutGuidPostDto, User>()
                .ForMember(dest => dest.Mail, opt => opt.MapFrom(src => src.Mail));
        }
    }
}
