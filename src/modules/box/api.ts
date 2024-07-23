import { axiosAuthorized } from "@/lib/axios";
import { GetBoxResponse } from "./types";

export function createBox(values: any) {
    return axiosAuthorized.post(`/api/box/`, values);
}
export function getStoreBoxes(storeId: number) {
    return axiosAuthorized.get<GetBoxResponse[]>(
        `/api/box/warehouse/${storeId}/`
    );
}
export function getAllBoxes(searchValue: string) {
    return axiosAuthorized.get<GetBoxResponse[]>(
        `/api/box/?search=${searchValue}`
    );
}

export function deleteBox(boxId: number) {
    return axiosAuthorized.delete(`/api/box/${boxId}/`);
}
