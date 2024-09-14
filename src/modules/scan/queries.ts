import { useQuery } from "@tanstack/react-query";
import { getCellInfo, getScanInfo } from "./api";
import { GetCellInfo, GetScanInfo } from "./types";

export const useGetScanInfo = (barcode: string) => {
    return useQuery<GetScanInfo>({
        queryKey: [`scan-info`, barcode],
        queryFn: async () => {
            const { data } = await getScanInfo(barcode);
            return data;
        },
        enabled: false,
    });
};
export const useGetScanCellInfo = (barcode: string) => {
    return useQuery<GetCellInfo>({
        queryKey: [`scan-cell-info`, barcode],
        queryFn: async () => {
            const { data } = await getCellInfo(barcode);
            return data;
        },
        enabled: false,
    });
};
