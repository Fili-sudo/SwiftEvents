import axiosInstance from "config/axios";

const API_URL = "/Guest/GetGuestByIdAnonymus";

export const GetGuestByIdAnonymus = async (guestId) => {
    
    const response = await axiosInstance.get(
        `${API_URL}/${guestId}`
    );
    return response;
};