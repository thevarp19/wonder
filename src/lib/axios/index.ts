import { baseURL } from "@/config/site";
import { createAxiosWithBaseUrl } from "./helper";

export const axios = createAxiosWithBaseUrl(baseURL);
