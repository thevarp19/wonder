import { axiosAuthorized } from "@/lib/axios";
import { GetBoxResponse } from "./types";

export function createBox(formData: FormData) {
    return axiosAuthorized.post(`/api/box-types`, formData);
}

export function getBoxes() {
    return axiosAuthorized.get<GetBoxResponse[]>(`/api/box-types`);
}

export function deleteBox(id: number) {
    return axiosAuthorized.delete(`/api/box-types/${id}`);
}
