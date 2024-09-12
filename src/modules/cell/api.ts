import { axiosAuthorized } from "@/lib/axios";
import { CreateCellRequest, GetCellResponse, UpdateCellRequest } from "./types";

export function createCell(data: CreateCellRequest, id: number) {
    return axiosAuthorized.post(`/api/cell/${id}/`, data);
}

export function getCells(storeId: number) {
    return axiosAuthorized.get<GetCellResponse[]>(`/api/cell/${storeId}/`);
}
export function getCellBarcodeById(storeId: number, cellId: number) {
    return axiosAuthorized.get(`/api/cell/${storeId}/barcodes/${cellId}/`, {
        responseType: "blob",
    });
}
export function getCellBarcodes(storeId: number) {
    return axiosAuthorized.get(`/api/cell/${storeId}/barcodes/`, {
        responseType: "blob",
    });
}

export function updateCell(id: number, values: UpdateCellRequest) {
    return axiosAuthorized.patch(`/api/cell/detail/${id}/`, values);
}
export function deleteCell(id: number) {
    return axiosAuthorized.delete(`/api/cell/detail/${id}/`);
}

export function addProductToCell(cellId: number, productArticle: number) {
    return axiosAuthorized.post(
        `/api/cells/add-product-to-cell?cell-id=${cellId}&product-article=${productArticle}`
    );
}
