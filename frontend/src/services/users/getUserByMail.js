import axiosInstance from "config/axios";

const API_URL = "/User/GetUserByMail";

export const getUserByMail = async (mail, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };

    const response = await axiosInstance.get(
        `${API_URL}/${mail}`,config
    );
    return response;
};