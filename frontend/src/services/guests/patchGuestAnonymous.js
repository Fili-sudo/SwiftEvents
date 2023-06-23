import axiosInstance from "config/axios";

const API_URL = "/Guest/PatchGuestAnonymous";

export const PatchGuestAnonymous = async (body) => {
    
    const response = await axiosInstance.patch(
        `${API_URL}`, body
    );
    return response;
};