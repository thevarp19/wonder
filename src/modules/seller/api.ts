import { axiosAuthorized } from "@/lib/axios";
import { GetSellerProfile } from "./types";

export function getSellerProfile() {
    return axiosAuthorized.get<GetSellerProfile>(`/api/sellers/me`);
}

export function updateSellerProfile(id: number, values: GetSellerProfile) {
    return axiosAuthorized.put(`/api/sellers/${id}`, values);
}
