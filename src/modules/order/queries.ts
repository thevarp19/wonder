import { useQuery } from "@tanstack/react-query";
import {
    getOrder,
    getOrderById,
    getOrderDetailEmployee,
    getOrdersByDate,
    getOrdersEmployee,
} from "./api";
import {
    GetOrderById,
    GetOrderDetailEmployee,
    GetOrdersByDate,
    GetOrdersEmployee,
} from "./types";

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
