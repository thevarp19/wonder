import { axiosAuthorized } from "@/lib/axios";
import { GetSellerProfile } from "./types";

export function getSellerProfile(id: string) {
    return axiosAuthorized.get<GetSellerProfile>(`/api/sellers/${id}`);
}

export function updateSellerProfile(id: number, values: GetSellerProfile) {
    return axiosAuthorized.put(`/api/sellers/${id}`, values);
}
