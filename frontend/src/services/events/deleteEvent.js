import axiosInstance from "config/axios";

const API_URL = "/Event";

export const DeleteEvent = async (id, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };

    const response = await axiosInstance.delete(
        `${API_URL}/${id}`,config
    );
    return response;
};