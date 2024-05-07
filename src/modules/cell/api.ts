import { axiosAuthorized } from "@/lib/axios";
import { CreateCellRequest, GetCellResponse, UpdateCellRequest } from "./types";

export function createCell(data: CreateCellRequest) {
    return axiosAuthorized.post(`/api/cells`, data);
}

export function getCells(storeId: number) {
    return axiosAuthorized.get<GetCellResponse[]>(
        `/api/cells?store-id=${storeId}`
    );
}

export function updateCell(id: number, values: UpdateCellRequest) {
    return axiosAuthorized.put(`/api/cells/${id}`, values);
}

export function deleteCell(id: number) {
    return axiosAuthorized.delete(`/api/cells/${id}`);
}

export function addProductToCell(cellId: number, products: number[]) {
    return axiosAuthorized.delete(
        `/api/cells/add-product-to-cell?cell-id=${cellId}&product=${products}`
    );
}
