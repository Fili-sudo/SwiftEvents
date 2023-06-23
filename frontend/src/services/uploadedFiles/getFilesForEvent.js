import axiosInstance from "config/axios";

const API_URL = "/UploadedFile/GetFiles";

export const GetFilesForEvent = async (id, token) => {
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