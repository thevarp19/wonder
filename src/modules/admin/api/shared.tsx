import { axiosAuthorized } from "@/lib/axios";
import {
    CreateStoreRequest,
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
