import { useQuery } from "@tanstack/react-query";
import { getOrder, getOrderById, getOrdersByDate } from "./api";
import { GetOrderById, GetOrdersByDate } from "./types";

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

export const useGetOrder = (id: number) => {
    return useQuery<GetOrderById[]>({
        queryKey: [`store`, id],
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
