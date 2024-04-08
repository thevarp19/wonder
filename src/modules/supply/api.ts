import { axiosAuthorized } from "@/lib/axios";
import { GetSuppliesByDate, GetSupplyById } from "./types";

export function getSuppliesByDate(startDate: string, endDate: string) {
    return axiosAuthorized.get<GetSuppliesByDate[]>(
        `/api/supplies?start-date=${startDate}&end-date=${endDate}`
    );
}

export function getSupplyById(id: number) {
    return axiosAuthorized.get<GetSupplyById>(`/api/supplies/detail/${id}`);
}
