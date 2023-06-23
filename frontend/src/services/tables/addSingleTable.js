import axiosInstance from "config/axios";

const API_URL = "/Table/AddSingleTable";

export const AddSingleTable = async (body, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };
    
    const response = await axiosInstance.post(
        `${API_URL}`, body, config
    );
    return response;
};