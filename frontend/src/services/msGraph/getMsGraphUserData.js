import axiosInstance from "config/axios";

const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";

export const getMsGraphUserData = async (token) => {
    const config = {
        headers:{
          Authorization : `Bearer ${token}`
        }
    };

    const response = await axiosInstance.get(
        `${graphMeEndpoint}`,config
    );
    return response;
}