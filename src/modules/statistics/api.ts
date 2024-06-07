import { axiosAuthorized } from "@/lib/axios";
import { GetProductCountResponse, GetSalesInfoResponse } from "./types";

export function getSalesInfo(duration: string) {
    return axiosAuthorized.get<GetSalesInfoResponse>(
        `/api/statistics/sales-information/admin-stats?duration=${duration}`
    );
}
export function getSellerProductCount(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetProductCountResponse>(
        `/api/statistics/products-count/seller-stats?page=${page}&size=${size}`
    );
}
