import axios, { Axios } from "axios";
import jwtService from "../jwt";

const refreshJwtUrl = `/api/login/refresh/`;
const unauthorizedStatus = 401;

export const createAxiosWithBaseUrl = (baseURL: string) => {
    const axiosApi = axios.create({
        baseURL: baseURL,
    });
    return axiosApi;
};

export const applyJwtAuth = (axiosApi: Axios) => {
    axiosApi.interceptors.request.use(
        (config) => {
            return setAuthHeader(config);
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export const configureRefreshRetry = (axiosApi: Axios) => {
    axiosApi.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (isAxiosUnauthorized(error) && !originalRequest._retry) {
                originalRequest._retry = true;
                return await refreshJwt(axiosApi, originalRequest);
            }
            if (isAxiosUnauthorized(error)) {
                jwtService.removeJwt();
            }

            return Promise.reject(error);
        }
    );
};

const setAuthHeader = (config: any) => {
    const access = jwtService.getAccessToken();
    if (access) {
        config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
};

const isAxiosUnauthorized = (error: any) => {
    return error?.response?.status === unauthorizedStatus;
};

const refreshJwt = async (axiosApi: any, originalRequest: Axios) => {
    try {
        const refreshResponse = await makeRefreshJwtRequest(axiosApi);
        const newAccessToken = refreshResponse.data.access;
        jwtService.setAccessToken(newAccessToken);
        setAuthHeader(originalRequest);
        return axiosApi(originalRequest);
    } catch (refreshError) {
        return Promise.reject(refreshError);
    }
};

const makeRefreshJwtRequest = (axiosApi: any) => {
    const options = {
        refresh: jwtService.getRefreshToken() || "refresh",
    };
    return axiosApi.post(refreshJwtUrl, options, { _retry: true });
};
