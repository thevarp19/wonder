import { baseAutoUploadURL, baseURL } from "@/config/site";
import { applyJwtAuth, createAxiosWithBaseUrl } from "./helper";

const axios = createAxiosWithBaseUrl(baseURL);
const axiosAuthorized = createAxiosWithBaseUrl(baseURL);
const axiosAuthorizedAutoUpload = createAxiosWithBaseUrl(baseAutoUploadURL);

applyJwtAuth(axiosAuthorized);
applyJwtAuth(axiosAuthorizedAutoUpload);
// configureRefreshRetry(axiosAuthorized);

export { axios, axiosAuthorized, axiosAuthorizedAutoUpload };
