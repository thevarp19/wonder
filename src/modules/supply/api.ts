import { axiosAuthorized } from "@/lib/axios";
import { CreateSupplyRequest, GetSuppliesByDate, GetSupplyById } from "./types";

export function getSuppliesByDate(startDate: string, endDate: string) {
    return axiosAuthorized.get<GetSuppliesByDate[]>(
        `/api/supplies/employee?start-date=${startDate}&end-date=${endDate}`
    );
}

export function getSupplyById(id: number) {
    return axiosAuthorized.get<GetSupplyById[]>(`/api/supplies/detail/${id}`);
}

export function createSupply(data: CreateSupplyRequest) {
    return axiosAuthorized.post<{ id: number }>(`/api/supplies`, data);
}
