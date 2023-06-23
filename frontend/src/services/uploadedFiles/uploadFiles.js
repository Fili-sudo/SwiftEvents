import axiosInstance from "config/axios";

const API_URL = "/UploadedFile/UploadFile";

export const UploadFiles = async (bodies, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };
    
    const requests = bodies.map((file) => axiosInstance.post(
        `${API_URL}`, file, config
    ));
        
    const response = await Promise.allSettled(requests);
    
    return response;
};