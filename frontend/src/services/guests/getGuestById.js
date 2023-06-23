import axiosInstance from "config/axios";

const API_URL = "/Guest/GetGuestById";

export const GetGuestById = async (guestId, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };
    
    const response = await axiosInstance.get(
        `${API_URL}/${guestId}`, config
    );
    return response;
};