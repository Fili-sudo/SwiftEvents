import axiosInstance from "config/axios";

const API_URL = "/UploadedFile/GetFilesAnonymous";

export const GetFilesForEventAnonymous = async (id) => {
    
    const response = await axiosInstance.get(
        `${API_URL}/${id}`
    );
    return response;
};