import { baseURL } from "@/config/site";
import {
    applyJwtAuth,
    configureRefreshRetry,
    createAxiosWithBaseUrl,
} from "./helper";

const axios = createAxiosWithBaseUrl(baseURL);
const axiosAuthorized = createAxiosWithBaseUrl(baseURL);

applyJwtAuth(axiosAuthorized);
configureRefreshRetry(axiosAuthorized);

export { axios, axiosAuthorized };
