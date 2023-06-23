import axiosInstance from "config/axios";

const API_URL = "/Event/GetEventForUser";

export const getEventsForUser = async (id, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };

    const response = await axiosInstance.get(
        `${API_URL}/${id}`,config
    );
    return response;
};