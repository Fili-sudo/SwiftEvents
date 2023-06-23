using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class TableGetForGuestDtoProfile : Profile
    {
        public TableGetForGuestDtoProfile()
        {
            CreateMap<Table, TableGetForGuestDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.TableNumber, opt => opt.MapFrom(src => src.TableNumber))
                .ForMember(dest => dest.NoOfSeats, opt => opt.MapFrom(src => src.NoOfSeats));
        }
    }
}
