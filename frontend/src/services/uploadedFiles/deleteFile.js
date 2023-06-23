import axiosInstance from "config/axios";

const API_URL = "/UploadedFile/DeleteFile";

export const DeleteFile = async (id, token) => {
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