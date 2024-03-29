import { axiosAuthorized } from "@/lib/axios";
import {
    CreateStoreRequest,
    GetStoreResponse,
    UpdateStoreRequest,
} from "./types";

export function createStore(values: CreateStoreRequest) {
    return axiosAuthorized.post(`/api/stores`, values);
}

export function getStoreById(id: string) {
    return axiosAuthorized.get<GetStoreResponse>(`/api/stores/details/${id}`);
}

export function getStores() {
    return axiosAuthorized.get<GetStoreResponse[]>(`/api/stores/details`);
}

export function updateStore(id: string, values: UpdateStoreRequest) {
    return axiosAuthorized.put(`/api/stores/${id}`, values);
}

export function deleteStore(id: string) {
    return axiosAuthorized.delete(`/api/stores/${id}`);
}

export function bindBoxToStore(id: string, boxId: string) {
    return axiosAuthorized.post(
        `/api/stores/add-box-type?box-type-id=${boxId}&store-id=${id}`
    );
}

export function removeBoxFromStore(id: string, boxId: string) {
    return axiosAuthorized.delete(
        `/api/stores/remove-box-type?box-type-id=${boxId}&store-id=${id}`
    );
}
