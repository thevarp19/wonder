import { axiosAuthorized } from "@/lib/axios";
import { DeliveryMode } from "../order/types";
import {
    AddReplenishmentRequest,
    GetAdminReplenishmentResponse,
    GetSellerBalanceStatementResponse,
    GetSellerReplenishmentResponse,
} from "./types";

export function getAdminReplenishment(
    page: number = 0,
    size: number = 10,
    searchValue: string = ""
) {
    return axiosAuthorized.get<GetAdminReplenishmentResponse>(
        `/api/replenishment/admin/?page=${page}&size=${size}&search=${searchValue}`
    );
}
export function getSellerReplenishment(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetSellerReplenishmentResponse>(
        `/api/replenishment/seller/?page=${page}&size=${size}`
    );
}
export function getSellerBalanceStatement(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetSellerBalanceStatementResponse>(
        `/api/order-seller/payment_history/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}

export function addReplenishment(values: AddReplenishmentRequest) {
    return axiosAuthorized.post(`/api/replenishment/seller/`, values);
}
export function changeStatusReplenishment(id: number, status: string) {
    return axiosAuthorized.patch(`/api/replenishment/admin/${id}/`, {
        status: status,
    });
}
// export function changeFileReplenishment(id: number, file: string) {
//     return axiosAuthorized.patch(`/api/replenishment/admin/${id}/`, {
//         check_file: file,
//     });
// }
