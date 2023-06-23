import axiosInstance from "config/axios";

const API_URL = "/Guest/GetGuestsForEvent";

export const getPaginatedGuests = async (eventId, pageNumber, pageSize, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };
    
    const response = await axiosInstance.get(
        `${API_URL}/${eventId}?PageNumber=${pageNumber}&PageSize=${pageSize}`, config
    );
    return response;
};