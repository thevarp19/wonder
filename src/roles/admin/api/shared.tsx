import { axiosAuthorized } from "@/lib/axios";
import {
    CityResponse,
    CreateStoreRequest,
    GetBoxesResponse,
    GetStoresResponse,
    GetStoresWithDetailsResponse,
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

export async function getStoresWithDetails() {
    return axiosAuthorized.get<GetStoresWithDetailsResponse[]>(
        `/api/stores/details`
    );
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

export async function bindBoxToStore(storeId: string, boxId: string) {
    return axiosAuthorized.post(
        `/api/stores/add-box-type?box-type-id=${boxId}&store-id=${storeId}`
    );
}

export async function removeBoxFromStore(storeId: string, boxId: string) {
    return axiosAuthorized.delete(
        `/api/stores/remove-box-type?box-type-id=${boxId}&store-id=${storeId}`
    );
}

export async function getCities() {
    return axiosAuthorized.get<CityResponse[]>("/api/cities");
}
