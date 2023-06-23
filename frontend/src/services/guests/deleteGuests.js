import axiosInstance from "config/axios";

const API_URL = "/Guest/DeleteGuestsRange";

export const DeleteGuests = async (id, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };

    const response = await axiosInstance.delete(
        `${API_URL}?guestIds=${id}`,config
    );
    return response;
};