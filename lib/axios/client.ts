// import { ApiError } from "@/types/api-type";
import { ApiError } from "@/types/api";
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: '/api/erp/v1',
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

api.interceptors.response.use(
    (response) => {
        // Log('response', response.data)
        if (response.data?.exc_type) {
            return Promise.reject(response.data as ApiError);
        }
        return response;
    },
    (error) => {
        // Log('in axios', error.response?.data)
        return Promise.reject(error.response?.data as ApiError);
    }
);

export default api;