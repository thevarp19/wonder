import { axiosAuthorized } from "@/lib/axios";
import { GetCellInfo, GetScanInfo } from "./types";

export function getScanInfo(barcode: string) {
    return axiosAuthorized.get<GetScanInfo>(`/api/supply/info/${barcode}/`);
}
export function getCellInfo(barcode: string) {
    return axiosAuthorized.get<GetCellInfo>(
        `/api/cell/detail-by-barcode/${barcode}/`
    );
}
export function acceptProductByBarcode(barcode: string, defective: number = 0) {
    return axiosAuthorized.post(`/api/supplier-box-product/acceptance/${barcode}/${defective}/
`);
}
export function placementProductByBarcode(cellId: number, barcode: string) {
    return axiosAuthorized.post(`/api/supplier-box-product/acceptance/cell/${cellId}/${barcode}/

`);
}
