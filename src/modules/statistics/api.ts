import { axiosAuthorized } from "@/lib/axios";
import {
    AnalyticsData,
    GetLastOrdersResponse,
    GetProductCountResponse,
} from "./types";

export function getAdminStatistics(duration: string) {
    return axiosAuthorized.get<AnalyticsData>(
        `/api/analytics/admin/?type=${duration}`
    );
}
export function getSellerStatistics(duration: string) {
    return axiosAuthorized.get<AnalyticsData>(
        `/api/analytics/seller/?type=${duration}`
    );
}
export function getAdminLastOrders(page: number = 1, size: number = 5) {
    return axiosAuthorized.get<GetLastOrdersResponse>(
        `/api/analytics/admin/active-orders/?page=${page}&size=${size}`
    );
}
export function getSellerProductCount(page: number = 1, size: number = 5) {
    return axiosAuthorized.get<GetProductCountResponse>(
        `/api/analytics/seller/products/?page=${page}&size=${size}`
    );
}
