import { axiosAuthorized } from "@/lib/axios";
import {
    AcceptSupplyProductRequest,
    CreateSupplyRequest,
    CreateSupplyResponse,
    GetEmployeeSupplies,
    GetSellerSupplies,
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
    return axiosAuthorized.get<GetSupplyProducts[]>(
        `/api/supplier-box-product/supply/${id}/`
    );
}

export function getSupplyBox(boxBarCode: number) {
    return axiosAuthorized.get<GetSupplyProducts[]>(
        `/api/supplier-box-product/box/${boxBarCode}/`
    );
}

export function getSellerSupplies(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetSellerSupplies>(
        `/api/supply/seller/?page=${page}&size=${size}`
    );
}

export function getEmployeeSupplies(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetEmployeeSupplies>(
        `/api/supply/employee/v2/?page=${page}&size=${size}`
    );
}

export function createSupply(data: CreateSupplyRequest) {
    return axiosAuthorized.post<CreateSupplyResponse>(
        `/api/supply/seller/`,
        data
    );
}

export function acceptSupplyProducts(
    values: AcceptSupplyProductRequest,
    supplyId: number
) {
    return axiosAuthorized.patch(
        `/api/supply/employee/accept/${supplyId}/`,
        values
    );
}
export function editSupplyStatus(supplyId: number, values: { status: string }) {
    return axiosAuthorized.put(
        `/api/supply/employee/edit/${supplyId}/`,
        values
    );
}

export function getSupplyReport(id: number) {
    return axiosAuthorized.get<GetSupplyReport>(
        `/api/supplies/seller/report/${id}`
    );
}
