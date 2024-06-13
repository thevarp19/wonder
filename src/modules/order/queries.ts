import { useQuery } from "@tanstack/react-query";
import {
    getAdminOrderById,
    getOrderDetailEmployee,
    getOrdersAdmin,
    getOrdersByDate,
    getOrdersEmployee,
    getOrdersSeller,
} from "./api";
import {
    DeliveryMode,
    GetOrderById,
    GetOrderDetailEmployee,
    GetOrdersAdmin,
    GetOrdersByDate,
    GetOrdersEmployee,
    GetOrdersSeller,
} from "./types";

export const useGetOrdersAdmin = (
    startDate: string,
    endDate: string,
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode,
    byOrderCode: boolean = true,
    byShopName: boolean = false,
    byStoreAddress: boolean = false,
    byProductName: boolean = false,
    byProductArticle: boolean = false,
    byProductVendorCode: boolean = false
) => {
    return useQuery<GetOrdersAdmin>({
        queryKey: [
            `orders-admin`,
            startDate,
            endDate,
            page,
            size,
            searchValue,
            deliveryMode,
            byOrderCode,
            byShopName,
            byStoreAddress,
            byProductName,
            byProductArticle,
            byProductVendorCode,
        ],

        queryFn: async () => {
            const { data } = await getOrdersAdmin(
                startDate,
                endDate,
                page,
                size,
                searchValue,
                deliveryMode,
                byOrderCode,
                byShopName,
                byStoreAddress,
                byProductName,
                byProductArticle,
                byProductVendorCode
            );
            return data;
        },
    });
};

export const useGetOrdersByDate = (startDate: string, endDate: string) => {
    return useQuery<GetOrdersByDate[]>({
        queryKey: ["orders", startDate, endDate],
        queryFn: async () => {
            const { data } = await getOrdersByDate(startDate, endDate);
            return data
                .filter((order) => order.waybill !== null)
                .sort((a, b) => b.creationDate - a.creationDate);
        },
    });
};

export const useGetOrdersSeller = (
    startDate: string,
    endDate: string,
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode,
    byOrderCode: boolean = true,
    byShopName: boolean = false,
    byStoreAddress: boolean = false,
    byProductName: boolean = false,
    byProductArticle: boolean = false,
    byProductVendorCode: boolean = false
) => {
    return useQuery<GetOrdersSeller>({
        queryKey: [
            "seller-orders",
            startDate,
            endDate,
            page,
            size,
            searchValue,
            deliveryMode,
            byOrderCode,
            byShopName,
            byStoreAddress,
            byProductName,
            byProductArticle,
            byProductVendorCode,
        ],
        queryFn: async () => {
            const { data } = await getOrdersSeller(
                startDate,
                endDate,
                page,
                size,
                searchValue,
                deliveryMode,
                byOrderCode,
                byShopName,
                byStoreAddress,
                byProductName,
                byProductArticle,
                byProductVendorCode
            );
            return data;
        },
    });
};

export const useGetOrdersEmployee = (
    startDate: string,
    endDate: string,
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode,
    byOrderCode: boolean = true,
    byShopName: boolean = false,
    byStoreAddress: boolean = false,
    byProductName: boolean = false,
    byProductArticle: boolean = false,
    byProductVendorCode: boolean = false
) => {
    return useQuery<GetOrdersEmployee>({
        queryKey: [
            "orders-employee",
            startDate,
            endDate,
            page,
            size,
            searchValue,
            deliveryMode,
            byOrderCode,
            byShopName,
            byStoreAddress,
            byProductName,
            byProductArticle,
            byProductVendorCode,
        ],
        queryFn: async () => {
            const { data } = await getOrdersEmployee(
                startDate,
                endDate,
                page,
                size,
                searchValue,
                deliveryMode,
                byOrderCode,
                byShopName,
                byStoreAddress,
                byProductName,
                byProductArticle,
                byProductVendorCode
            );
            return data;
        },
    });
};

export const useGetOrderDetailEmployee = (id: number) => {
    return useQuery<GetOrderDetailEmployee[]>({
        queryKey: [`order-employee-${id}`],
        queryFn: async () => {
            const { data } = await getOrderDetailEmployee(id);
            return data;
        },
    });
};

export const useGetAdminOrder = (id: number) => {
    return useQuery<GetOrderById[]>({
        queryKey: [`order-admin-${id}`],
        queryFn: async () => {
            const { data } = await getAdminOrderById(id);
            return data;
        },
    });
};
