import { axiosAuthorized } from "@/lib/axios";
import { GetSellerProfile } from "./types";

export function getSellerProfile() {
    return axiosAuthorized.get<GetSellerProfile>(`/api/sellers/profile/`);
}

export function updateSellerProfile(formData: FormData) {
    return axiosAuthorized.put(`/api/sellers/profile/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
