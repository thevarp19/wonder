import { axiosAuthorized } from "@/lib/axios";
import { CreateStoreRequest, GetStoresResponse } from "../types/api";

export async function createStore(values: CreateStoreRequest) {
    return axiosAuthorized.post(`/api/stores`, values);
}

export async function getStores() {
    return axiosAuthorized.get<GetStoresResponse[]>(`/api/stores`);
}
