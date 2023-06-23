import axiosInstance from "config/axios";

const API_URL = "/Guest/UnsignGuestFromTable";

export const UnsignGuestFromTable = async (id, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };

    const response = await axiosInstance.patch(
        `${API_URL}/${id}`, {}, config
    );
    return response;
};