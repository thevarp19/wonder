import { axiosAuthorized } from "@/lib/axios";
import { CreateCellRequest, GetCellResponse } from "./types";

export function createCell(data: CreateCellRequest) {
    return axiosAuthorized.post(`/api/cells`, data);
}

export function getCells(storeId: number) {
    return axiosAuthorized.get<GetCellResponse[]>(
        `/api/cells?store-id=${storeId}`
    );
}

export function deleteCell(id: number) {
    return axiosAuthorized.delete(`/api/cells/${id}`);
}
