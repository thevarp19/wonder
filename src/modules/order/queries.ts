import { useQuery } from "@tanstack/react-query";
import {
    getOrder,
    getOrderById,
    getOrderDetailEmployee,
    getOrdersAdmin,
    getOrdersByDate,
    getOrdersEmployee,
    getOrdersSeller,
} from "./api";
import {
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
    size: number = 10
) => {
    return useQuery<GetOrdersAdmin>({
        queryKey: [`orders-admin`, startDate, endDate, page, size],
        queryFn: async () => {
            const { data } = await getOrdersAdmin(
                startDate,
                endDate,
                page,
                size
            );
            return {
                ...data,
                content: data.content
                    .filter((order) => order.waybill !== null)
                    .sort((a, b) => b.creationDate - a.creationDate),
            };
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
    size: number = 10
) => {
    return useQuery<GetOrdersSeller>({
        queryKey: ["seller-orders", startDate, endDate, page, size],
        queryFn: async () => {
            const { data } = await getOrdersSeller(
                startDate,
                endDate,
                page,
                size
            );
            return {
                ...data,
                content: data.content
                    .filter((order) => order.waybill !== null)
                    .sort((a, b) => b.creationDate - a.creationDate),
            };
        },
    });
};

export const useGetOrdersEmployee = (startDate: string, endDate: string) => {
    return useQuery<GetOrdersEmployee[]>({
        queryKey: ["orders-employee", startDate, endDate],
        queryFn: async () => {
            const { data } = await getOrdersEmployee(startDate, endDate);
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

export const useGetOrder = (id: number) => {
    return useQuery<GetOrderById[]>({
        queryKey: [`orders-${id}`],
        queryFn: async () => {
            const { data } = await getOrderById(id);
            return data;
        },
    });
};

export const useGetOrderData = (id: number) => {
    return useQuery<GetOrdersByDate>({
        queryKey: [`store`, id],
        queryFn: async () => {
            const { data } = await getOrder(id);
            return data;
        },
    });
};
