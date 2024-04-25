import { axiosAuthorized } from "@/lib/axios";
import {
    GetOrderById,
    GetOrderDetailEmployee,
    GetOrdersByDate,
    GetOrdersEmployee,
} from "./types";

export function getOrdersByDate(startDate: string, endDate: string) {
    return axiosAuthorized.get<GetOrdersByDate[]>(
        `/api/orders/admin?start-date=${startDate}&end-date=${endDate}`
    );
}

export function getOrdersEmployee(startDate: string, endDate: string) {
    return axiosAuthorized.get<GetOrdersEmployee[]>(
        `/api/orders/employee?start-date=${startDate}&end-date=${endDate}`
    );
}

export function getOrderDetailEmployee(id: number) {
    return axiosAuthorized.get<GetOrderDetailEmployee[]>(
        `/api/orders/employee/details/${id}`
    );
}

export function getOrderById(id: number) {
    return axiosAuthorized.get<GetOrderById[]>(
        `/api/orders/admin/details/${id}`
    );
}

export function getOrder(id: number) {
    return axiosAuthorized.get<GetOrdersByDate>(`/api/orders/${id}`);
}
