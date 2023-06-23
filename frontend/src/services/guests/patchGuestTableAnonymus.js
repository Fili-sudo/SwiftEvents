import axiosInstance from "config/axios";

const API_URL = "/Guest/PatchGuestTableAnonymous";

export const PatchGuestTableAnonymous = async (body) => {
    
    const response = await axiosInstance.patch(
        `${API_URL}`, body
    );
    return response;
};