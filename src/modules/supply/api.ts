import { axiosAuthorized } from "@/lib/axios";
import {
    AcceptSupplyProductRequest,
    CreateSupplyRequest,
    CreateSupplyResponse,
    GetEmployeeSupplies,
    GetSellerSupply,
    GetSupplyBox,
    GetSupplyById,
    GetSupplyProducts,
    GetSupplyReport,
} from "./types";

// export function getSuppliesByDate(startDate: string, endDate: string) {
//     return axiosAuthorized.get<GetSuppliesByDate[]>(
//         `/api/supplies/employee?start-date=${startDate}&end-date=${endDate}`
//     );
// }

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

export function getSellerSupplies() {
    return axiosAuthorized.get<GetSellerSupply[]>(`/api/supply/seller/`);
}

export function getEmployeeSupplies() {
    return axiosAuthorized.get<GetEmployeeSupplies[]>(`/api/supply/employee/`);
}

export function createSupply(data: CreateSupplyRequest) {
    return axiosAuthorized.post<CreateSupplyResponse>(
        `/api/supply/seller/`,
        data
    );
}

export function acceptSupplyProducts(values: AcceptSupplyProductRequest) {
    return axiosAuthorized.post(`/api/supplies/employee/scan`, values);
}
export function getSupplyReport(id: number) {
    return axiosAuthorized.get<GetSupplyReport>(
        `/api/supplies/seller/report/${id}`
    );
}
