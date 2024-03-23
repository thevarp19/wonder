import { axiosAuthorized } from "@/lib/axios";
import {
    CreateStoreRequest,
    GetBoxesResponse,
    GetStoresResponse,
    UpdateStoreRequest,
} from "../types/api";

export async function createStore(values: CreateStoreRequest) {
    return axiosAuthorized.post(`/api/stores`, values);
}

export async function updateStore(storeId: string, values: UpdateStoreRequest) {
    return axiosAuthorized.patch(`/api/stores/${storeId}`, values);
}

export async function getStores() {
    return axiosAuthorized.get<GetStoresResponse[]>(`/api/stores`);
}

export async function getBoxes() {
    return axiosAuthorized.get<GetBoxesResponse[]>(`/api/box-types`);
}

export async function createBox(formData: FormData) {
    return axiosAuthorized.post(`/api/box-types`, formData);
}

export async function deleteBox(boxId: string) {
    return axiosAuthorized.delete(`/api/box-types/${boxId}`);
}
