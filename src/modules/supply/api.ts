import { axiosAuthorized } from "@/lib/axios";
import {
    AcceptSupplyProductRequest,
    CreateSupplyRequest,
    CreateSupplyResponse,
    GetSellerSupply,
    GetSuppliesByDate,
    GetSupplyBox,
    GetSupplyById,
    GetSupplyProducts,
    GetSupplyReport,
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

export function getSellerSupplies(
    startDate: string = "2000-01-01",
    endDate: string = "2100-01-01"
) {
    return axiosAuthorized.get<GetSellerSupply[]>(
        `/api/supplies/seller?start-date=${startDate}&end-date=${endDate}`
    );
}

export function createSupply(data: CreateSupplyRequest) {
    return axiosAuthorized.post<CreateSupplyResponse>(`/api/supplies`, data);
}

export function acceptSupplyProducts(values: AcceptSupplyProductRequest) {
    return axiosAuthorized.post(`/api/supplies/employee/scan`, values);
}
export function getSupplyReport(id: number) {
    return axiosAuthorized.get<GetSupplyReport>(
        `/api/supplies/seller/report/${id}`
    );
}
