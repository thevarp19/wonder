import { axiosAuthorized } from "@/lib/axios";
import { GetSellerProfile } from "./types";

export function getSellerProfile() {
    return axiosAuthorized.get<GetSellerProfile>(`/api/sellers/profile/`);
}

export function updateSellerProfile(values: GetSellerProfile) {
    return axiosAuthorized.put(`/api/sellers/profile/`, values);
}
