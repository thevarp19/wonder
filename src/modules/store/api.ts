import { axiosAuthorized } from "@/lib/axios";
import {
    ActivateStoreSellerRequest,
    CreateStoreRequest,
    CreateStoreSellerRequest,
    GetAvailableStoreResponse,
    GetDetailSellerOwnStoreResponse,
    GetDetailSellerStoreResponse,
    GetDetailStoreResponse,
    GetStoreResponse,
    GetStoreSellerResponse,
    UpdateStoreRequest,
    UpdateStoreSellerRequest,
} from "./types";

export function createStore(values: CreateStoreRequest) {
    return axiosAuthorized.post(`/api/warehouse/wonder/`, values);
}
export function createStoreSeller(values: CreateStoreSellerRequest) {
    return axiosAuthorized.post(`/api/warehouse/seller/`, values);
}
export function activateStoreSeller(
    values: ActivateStoreSellerRequest,
    wonder_id: number
) {
    return axiosAuthorized.post(
        `/api/warehouse/seller/add/wonder/${wonder_id}/`,
        values
    );
}

export function getStoreSellerById(id: number) {
    return axiosAuthorized.get<GetDetailSellerStoreResponse>(
        `/api/warehouse/seller/${id}/`
    );
}
export function getStoreSellerOwnById(id: number) {
    return axiosAuthorized.get<GetDetailSellerOwnStoreResponse>(
        `/api/warhouse/kaspi-info/${id}/`
    );
}

export function getStoreById(id: number) {
    return axiosAuthorized.get<GetDetailStoreResponse>(
        `/api/warehouse/wonder/${id}/`
    );
}
export function getSellerStoreById(id: number) {
    return axiosAuthorized.get<GetDetailSellerStoreResponse>(
        `/api/warehouse/seller/${id}/`
    );
}

export function getStores() {
    return axiosAuthorized.get<GetStoreResponse[]>(`/api/warehouse/wonder/`);
}
export function getAvailableStores() {
    return axiosAuthorized.get<GetAvailableStoreResponse[]>(
        `/api/warehouse/seller/enabled/`
    );
}

export function getSellerStores() {
    return axiosAuthorized.get<GetStoreSellerResponse[]>(
        `/api/warehouse/seller/`
    );
}
export function updateStore(id: number, values: UpdateStoreRequest) {
    return axiosAuthorized.patch(`/api/warehouse/wonder/${id}/`, values);
}
export function updateStoreSeller(
    id: number,
    values: UpdateStoreSellerRequest
) {
    return axiosAuthorized.patch(`/api/warehouse/seller/${id}/`, values);
}

export function updateStoreStatus(id: number, values: { enabled: boolean }) {
    return axiosAuthorized.patch(`/api/warehouse/wonder/${id}/`, values);
}
export function updateStoreStatusSeller(
    id: number,
    values: { enabled: boolean }
) {
    return axiosAuthorized.patch(`/api/warehouse/seller/${id}/`, values);
}

export function deleteStore(id: number) {
    return axiosAuthorized.delete(`/api/warehouse/wonder/${id}/`);
}
export function deleteStoreSeller(id: number) {
    return axiosAuthorized.delete(`/api/warehouse/seller/${id}/`);
}
export function bindBoxToStore(storeId: number, boxId: number) {
    return axiosAuthorized.post(`/api/box/warehouse/${storeId}/${boxId}/`);
}

export function removeBoxFromStore(storeId: number, boxId: number) {
    return axiosAuthorized.delete(`/api/box/warehouse/${storeId}/${boxId}/`);
}
