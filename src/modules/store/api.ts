import { axiosAuthorized } from "@/lib/axios";
import {
    ActivateStoreSellerRequest,
    CreateStoreRequest,
    CreateStoreSellerRequest,
    GetDetailSellerStoreResponse,
    GetDetailStoreResponse,
    GetStoreResponse,
    GetStoreSellerResponse,
    UpdateStoreRequest,
} from "./types";

export function createStore(values: CreateStoreRequest) {
    return axiosAuthorized.post(`/api/warehouse/wonder/`, values);
}
export function createStoreSeller(values: CreateStoreSellerRequest) {
    return axiosAuthorized.post(`/api/warehouse/seller/add/own/`, values);
}
export function activateStoreSeller(
    values: ActivateStoreSellerRequest,
    wonder_id: number
) {
    return axiosAuthorized.post(
        `/api/warehouse/seller/add/wonder/${wonder_id}`,
        values
    );
}

export function getStoreSellerById(id: number) {
    return axiosAuthorized.get<GetDetailSellerStoreResponse>(
        `/api/warehouse/seller/${id}/`
    );
}
export function getStoreById(id: number) {
    return axiosAuthorized.get<GetDetailStoreResponse>(
        `/api/warehouse/wonder/${id}/`
    );
}

export function getStores() {
    return axiosAuthorized.get<GetStoreResponse[]>(`/api/warehouse/wonder/`);
}

export function getSellerStores() {
    return axiosAuthorized.get<GetStoreSellerResponse[]>(
        `/api/warehouse/seller/`
    );
}
export function updateStore(id: number, values: UpdateStoreRequest) {
    return axiosAuthorized.patch(`/api/warehouse/wonder/${id}/`, values);
}
export function updateStoreStatus(id: number, values: { enabled: boolean }) {
    return axiosAuthorized.patch(`/api/warehouse/wonder/${id}/`, values);
}

export function deleteStore(id: string) {
    return axiosAuthorized.delete(`/api/stores/${id}`);
}

export function bindBoxToStore(storeId: number, boxId: number) {
    return axiosAuthorized.post(`/api/box/${storeId}/${boxId}/`);
}

export function removeBoxFromStore(storeId: number, boxId: number) {
    return axiosAuthorized.delete(`/api/box/${storeId}/${boxId}/`);
}
