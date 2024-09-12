import { useQuery } from "@tanstack/react-query";
import { getCellBarcodeById, getCellBarcodes, getCells } from "./api";
import { GetCellResponse } from "./types";

export const useGetCells = (storeId: number) => {
    return useQuery<GetCellResponse[]>({
        queryKey: [`cells`, storeId],
        queryFn: async () => {
            const { data } = await getCells(storeId);
            return data;
        },
    });
};

export const useGetCellBarcodes = (storeId: number) => {
    return useQuery<Blob>({
        queryKey: [`cell-barcodes`, storeId],
        queryFn: async () => {
            const response = await getCellBarcodes(storeId);
            return response.data;
        },
        enabled: false,
    });
};
export const useGetCellBarcodeById = (storeId: number, cellId: number) => {
    return useQuery<Blob>({
        queryKey: [`cell-barcode`, storeId, cellId],
        queryFn: async () => {
            const response = await getCellBarcodeById(storeId, cellId);
            return response.data;
        },
        enabled: false,
    });
};
