import { axiosAuthorized } from "@/lib/axios";
import { GetBoxResponse } from "./types";

export function createBox(formData: FormData) {
    return axiosAuthorized.post(`/api/box-types`, formData);
}

export function getBoxes(id: number) {
    return axiosAuthorized.get<GetBoxResponse[]>(
        `/api/box-types?store-id=${id}`
    );
}
export function getAllBoxes() {
    return axiosAuthorized.get<GetBoxResponse[]>(`/api/box-types/all`);
}

export function deleteBox(id: number) {
    return axiosAuthorized.delete(`/api/box-types/${id}`);
}
