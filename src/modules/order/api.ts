import { axiosAuthorized } from "@/lib/axios";
import { GetOrderById, GetOrdersByDate } from "./types";

export function getOrdersByDate(startDate: string, endDate: string) {
    return axiosAuthorized.get<GetOrdersByDate[]>(
        `/api/orders/admin?start-date=${startDate}&end-date=${endDate}`
    );
}

export function getOrderById(id: number) {
    return axiosAuthorized.get<GetOrderById[]>(`/api/orders/detail/${id}`);
}
