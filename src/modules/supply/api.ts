import { axiosAuthorized } from "@/lib/axios";
import {
    CreateSupplyRequest,
    GetSuppliesByDate,
    GetSupplyBox,
    GetSupplyById,
    GetSupplyProducts,
} from "./types";

export function getSuppliesByDate(startDate: string, endDate: string) {
    return axiosAuthorized.get<GetSuppliesByDate[]>(
        `/api/supplies/employee?start-date=${startDate}&end-date=${endDate}`
    );
}

export function getSupplyById(id: number) {
    return axiosAuthorized.get<GetSupplyById[]>(`/api/supplies/detail/${id}`);
}

export function getSupplyProducts(id: number) {
    return axiosAuthorized.get<GetSupplyProducts>(
        `/api/supplies/employee/products?supply-id=${id}`
    );
}

export function getSupplyBox(boxBarCode: number) {
    return axiosAuthorized.get<GetSupplyBox>(
        `/api/supplies/get-by-box/${boxBarCode}`
    );
}

export function createSupply(data: CreateSupplyRequest) {
    return axiosAuthorized.post<{ id: number }>(`/api/supplies`, data);
}
