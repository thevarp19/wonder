import { axiosAuthorized } from "@/lib/axios";
import { GetSellerProfile } from "./types";

export function getSellerProfile() {
    return axiosAuthorized.get<GetSellerProfile>(`/api/sellers/profile/`);
}

export function updateSellerProfile(formData: FormData) {
    return axiosAuthorized.patch(`/api/sellers/profile/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
export function deleteSellerProfile() {
    return axiosAuthorized.delete(`/api/sellers/profile/`);
}
