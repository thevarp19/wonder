import axios, { Axios } from "axios";
import jwtService from "../jwt";

const refreshJwtUrl = "/refresh";

const setAuthHeader = (config: any) => {
    const access = jwtService.getAccessToken();
    if (access) {
        config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
};

const isAxiosUnauthorized = (error: any) => {
    return error?.response?.status === 401;
};

const refreshJwt = (axiosApi: any) => {
    const options = {
        refreshToken: jwtService.getRefreshToken() || "refresh",
    };
    return axiosApi.post(refreshJwtUrl, options, { _retry: true });
};

const refreshAndRetry = async (axiosApi: any, originalRequest: Axios) => {
    try {
        const refreshResponse = await refreshJwt(axiosApi);
        const newAccessToken = refreshResponse.data.data.accessToken;
        const newRefreshToken = refreshResponse.data.data.refreshToken;
        jwtService.saveJwt({
            access: newAccessToken,
            refresh: newRefreshToken,
        });
        setAuthHeader(originalRequest);
        return axiosApi(originalRequest);
    } catch (refreshError) {
        window.location.href = "/auth";
    }
};

export const createAxiosWithBaseUrl = (baseURL: string) => {
    return axios.create({
        baseURL: baseURL,
    });
};

export const applyJwtAuth = (axiosApi: Axios) => {
    axiosApi.interceptors.request.use((config) => {
        return setAuthHeader(config);
    });
};

export const configureRefreshRetry = (axiosApi: Axios) => {
    axiosApi.interceptors.response.use(undefined, async (error) => {
        const originalRequest = error.config;
        if (isAxiosUnauthorized(error) && !originalRequest._retry) {
            originalRequest._retry = true;
            return await refreshAndRetry(axiosApi, originalRequest);
        }

        if (isAxiosUnauthorized(error)) {
            jwtService.removeJwt();
        }

        return Promise.reject(error);
    });
};
