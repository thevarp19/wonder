import { axiosAuthorized } from "@/lib/axios";
import { CreateCellRequest, GetCellResponse } from "./types";

export function createCell(data: CreateCellRequest) {
    return axiosAuthorized.post(`/api/cell-types`, data);
}

export function getCells(storeId: number) {
    return axiosAuthorized.get<GetCellResponse[]>(`/api/cell-types/${storeId}`);
}

export function deleteCell(id: number) {
    return axiosAuthorized.delete(`/api/cell-types/${id}`);
}
