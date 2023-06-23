import axiosInstance from "config/axios";

const API_URL = "/Guest/UpdateGuestsRange";

export const updateGuestInfo = async (body, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };
    
    const response = await axiosInstance.put(
        `${API_URL}`, body, config
    );
    return response;
};