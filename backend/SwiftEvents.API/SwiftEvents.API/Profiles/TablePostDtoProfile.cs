using AutoMapper;
using SwiftEvents.API.DTOs;
using SwiftEvents.Domain.Models;

namespace SwiftEvents.API.Profiles
{
    public class TablePostDtoProfile : Profile
    {
        public TablePostDtoProfile()
        {
            CreateMap<TablePostDto, Table>()
                .ForMember(dest => dest.EventId, opt => opt.MapFrom(src => src.EventId))
                .ForMember(dest => dest.TableNumber, opt => opt.MapFrom(src => src.TableNumber))
                .ForMember(dest => dest.NoOfSeats, opt => opt.MapFrom(src => src.NoOfSeats));
        }
    }
}
