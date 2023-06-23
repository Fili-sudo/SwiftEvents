import axiosInstance from "config/axios";

const API_URL = "/Table/GetAllTablesForEventIdAnonymus";

export const getTablesForEventAnonymys = async (id) => {
    
    const response = await axiosInstance.get(
        `${API_URL}/${id}`
    );
    return response;
};