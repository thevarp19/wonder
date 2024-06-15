import { useQuery } from "@tanstack/react-query";
import {
    getAdminDailyInfo,
    getAdminLastOrders,
    getAdminSalesInfo,
    getAdminTopSeller,
    getSellerDailyInfo,
    getSellerProductCount,
    getSellerSalesInfo,
    getSellerTopProducts,
} from "./api";
import {
    DurationType,
    GetDailyCountResponse,
    GetLastOrdersResponse,
    GetProductCountResponse,
    GetSalesAdminInfoResponse,
    GetSalesSellerInfoResponse,
    GetTopProductResponse,
    GetTopSellerResponse,
} from "./types";

export const useGetAdminSalesInfo = (duration: DurationType) => {
    return useQuery<GetSalesAdminInfoResponse>({
        queryKey: [`salesInfoAdmin`, duration],
        queryFn: async () => {
            const { data } = await getAdminSalesInfo(duration);
            return data;
        },
    });
};
export const useGetSellerSalesInfo = (duration: DurationType) => {
    return useQuery<GetSalesSellerInfoResponse>({
        queryKey: [`salesInfoSeller`, duration],
        queryFn: async () => {
            const { data } = await getSellerSalesInfo(duration);
            return data;
        },
    });
};
export const useGetAdminTopSeller = (page: number = 0, size: number = 10) => {
    return useQuery<GetTopSellerResponse>({
        queryKey: [`topSeller`, page, size],
        queryFn: async () => {
            const { data } = await getAdminTopSeller(page, size);
            return data;
        },
    });
};

export const useGetSellerTopProducts = (
    page: number = 0,
    size: number = 10
) => {
    return useQuery<GetTopProductResponse>({
        queryKey: [`topProducts`, page, size],
        queryFn: async () => {
            const { data } = await getSellerTopProducts(page, size);
            return data;
        },
    });
};
export const useGetAdminLastOrders = (page: number = 0, size: number = 10) => {
    return useQuery<GetLastOrdersResponse>({
        queryKey: [`lastOrders`, page, size],
        queryFn: async () => {
            const { data } = await getAdminLastOrders(page, size);
            return data;
        },
    });
};
export const useGetSellerProductCount = (
    page: number = 0,
    size: number = 10
) => {
    return useQuery<GetProductCountResponse>({
        queryKey: [`productCount`, page, size],
        queryFn: async () => {
            const { data } = await getSellerProductCount(page, size);
            return data;
        },
    });
};

export const useGetAdminDailyInfo = (duration: DurationType) => {
    return useQuery<GetDailyCountResponse[]>({
        queryKey: [`dailyInfoAdmin`, duration],
        queryFn: async () => {
            const { data } = await getAdminDailyInfo(duration);
            return data;
        },
    });
};
export const useGetSellerDailyInfo = (duration: DurationType) => {
    return useQuery<GetDailyCountResponse[]>({
        queryKey: [`dailyInfoSeller`, duration],
        queryFn: async () => {
            const { data } = await getSellerDailyInfo(duration);
            return data;
        },
    });
};
