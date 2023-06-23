import axiosInstance from "config/axios";

const API_URL = "/Guest/GetGuestsForEventWithSearch";

export const getPaginatedGuestsWithSearch = async (eventId, pageNumber, pageSize, search, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };
    
    const response = await axiosInstance.get(
        `${API_URL}/${eventId}?PageNumber=${pageNumber}&PageSize=${pageSize}&Search=${search}`, config
    );
    return response;
};