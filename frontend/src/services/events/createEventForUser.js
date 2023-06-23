import axiosInstance from "config/axios";

const API_URL = "/Event/CreateEventForUser";

export const CreateEventForUser = async (guests, sendMail, body, token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };
    
    const response = await axiosInstance.post(
        `${API_URL}?noOfGuests=${guests}&sendMail=${sendMail}`, body, config
    );
    return response;
};