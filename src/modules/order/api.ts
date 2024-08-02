import { axiosAuthorized } from "@/lib/axios";
import {
    AssembleOrderResponse,
    DeliveryMode,
    GetOrderById,
    GetOrderDetailEmployee,
    GetOrdersAdmin,
    GetOrdersEmployee,
    GetOrdersSeller,
} from "./types";

export function getOrdersAdmin(
    page: number = 1,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersAdmin>(
        `/api/order-admin/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}

// export function getOrdersByDate(startDate: string, endDate: string) {
//     return axiosAuthorized.get<GetOrdersByDate[]>(
//         `/api/orders/admin?start-date=${startDate}&end-date=${endDate}`
//     );
// }

export function getOrdersSeller(
    page: number = 1,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersSeller>(
        `/api/order-seller/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}

export function getOrdersEmployee(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = ""
) {
    return axiosAuthorized.get<GetOrdersEmployee>(
        `/api/order-employee/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}

export function getAdminOrderById(id: number) {
    return axiosAuthorized.get<GetOrderById[]>(
        `/api/orders/admin/details/${id}`
    );
}

export function getSellerOrderById(id: number) {
    return axiosAuthorized.get<GetOrderById[]>(
        `/api/orders/seller/details/${id}`
    );
}
export function getEmployeeOrderById(id: number) {
    return axiosAuthorized.get<GetOrderDetailEmployee>(
        `/api/orders/employee/details/${id}`
    );
}
export function startAssemble(id: number) {
    return axiosAuthorized.post<AssembleOrderResponse>(
        `/api/assemblies/${id}/start`
    );
}
export function assembleProducts(id: number, values: any) {
    return axiosAuthorized.post<AssembleOrderResponse>(
        `/api/assemblies/${id}/assemble-product`,
        values
    );
}
export function finishAssemble(id: number) {
    return axiosAuthorized.post<any>(`/api/assemblies/${id}/finish`);
}

export function startPackage(id: number) {
    return axiosAuthorized.post<any>(`/api/order-packages/${id}/start`);
}
export function finishPackage(id: number) {
    return axiosAuthorized.post<any>(`/api/order-packages/${id}/finish`);
}
export function packageProducts(id: number, values: any) {
    return axiosAuthorized.post<any>(
        `/api/order-packages/${id}/package-product`,
        values
    );
}
