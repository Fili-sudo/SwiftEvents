import axiosInstance from "config/axios";

const API_URL = "/Guest/AddGuestsForEventRange";

export const addGuests = async (eventId, body, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };
    
    const response = await axiosInstance.post(
        `${API_URL}?eventId=${eventId}`, body, config
    );
    return response;
};