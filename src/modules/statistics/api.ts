import { axiosAuthorized } from "@/lib/axios";
import {
    GetDailyCountResponse,
    GetLastOrdersResponse,
    GetProductCountResponse,
    GetSalesInfoResponse,
    GetTopProductResponse,
    GetTopSellerResponse,
} from "./types";

export function getAdminSalesInfo(duration: string) {
    return axiosAuthorized.get<GetSalesInfoResponse>(
        `/api/statistics/sales-information/admin-stats?duration=${duration}`
    );
}
export function getSellerSalesInfo(duration: string) {
    return axiosAuthorized.get<GetSalesInfoResponse>(
        `/api/statistics/sales-information/seller-stats?duration=${duration}`
    );
}
export function getSellerProductCount(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetProductCountResponse>(
        `/api/statistics/products-count/seller-stats?page=${page}&size=${size}`
    );
}
export function getAdminTopSeller(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetTopSellerResponse>(
        `api/statistics/top-sellers/admin-stats?page=${page}&size=${size}`
    );
}
export function getAdminLastOrders(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetLastOrdersResponse>(
        `api/statistics/last-orders/admin-stats?page=${page}&size=${size}`
    );
}
export function getSellerTopProducts(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetTopProductResponse>(
        `api/statistics/top-products/seller-stats?page=${page}&size=${size}`
    );
}
export function getAdminDailyInfo(duration: string) {
    return axiosAuthorized.get<GetDailyCountResponse[]>(
        `/api/statistics/daily/admin-stats?duration=${duration}`
    );
}
export function getSellerDailyInfo(duration: string) {
    return axiosAuthorized.get<GetDailyCountResponse[]>(
        `/api/statistics/daily/seller-stats?duration=${duration}`
    );
}
