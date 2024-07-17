import { axiosAuthorized } from "@/lib/axios";
import { GetBoxResponse } from "./types";

export function createBox(values: any) {
    return axiosAuthorized.post(`/api/box/`, values);
}

export function getBoxes(id: number) {
    return axiosAuthorized.get<GetBoxResponse[]>(
        `/api/box-types?store-id=${id}`
    );
}
export function getAllBoxes() {
    return axiosAuthorized.get<GetBoxResponse[]>(`/api/box/`);
}
export function getStoreBoxes(storeId: number) {
    return axiosAuthorized.get<GetBoxResponse[]>(`/api/box/${storeId}/`);
}
export function deleteBox(boxId: number) {
    return axiosAuthorized.delete(`/api/box/${boxId}/`);
}
