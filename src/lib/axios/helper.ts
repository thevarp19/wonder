import axios from "axios";

export const createAxiosWithBaseUrl = (baseURL: string) => {
    const axiosApi = axios.create({
        baseURL: baseURL,
    });
    return axiosApi;
};
