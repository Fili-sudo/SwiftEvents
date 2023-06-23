using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class UploadedFileGetDtoProfile : Profile
    {
        public UploadedFileGetDtoProfile()
        {
            CreateMap<UploadedFile, UploadedFileGetDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FileName, opt => opt.MapFrom(src => src.FileName))
                .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => src.DateCreated))
                .ForMember(dest => dest.AbsoluteUri, opt => opt.MapFrom(src => src.AbsoluteUri))
                .ForMember(dest => dest.EventId, opt => opt.MapFrom(src => src.EventId));
        }
    }
}
