import { axiosAuthorized } from "@/lib/axios";
import {
    DeliveryMode,
    GetAssembleOrdersEmployee,
    GetOrderById,
    GetOrderDetailEmployee,
    GetOrdersAdmin,
    GetOrdersEmployee,
    GetOrdersSeller,
    GetPackageOrdersEmployee,
    GetTransferOrdersEmployee,
    ProductStatusChangeRequest,
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
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersEmployee>(
        `/api/order-employee/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getAssembleOrderEmployee(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetAssembleOrdersEmployee>(
        `/api/supplier-box-product/order/employee/assemble/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getPackageOrderEmployee(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetPackageOrdersEmployee>(
        `/api/supplier-box-product/order/employee/packaging/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getTransferOrderEmployee(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetTransferOrdersEmployee>(
        `/api/order-employee/transfer/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
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
export function getEmployeeOrderById(id: string) {
    return axiosAuthorized.get<GetOrderDetailEmployee>(
        `/api/order-employee/${id}/`
    );
}
// export function startAssemble(id: number) {
//     return axiosAuthorized.post<AssembleOrderResponse>(
//         `/api/assemblies/${id}/start`
//     );
// }
// export function assembleProducts(id: number, values: any) {
//     return axiosAuthorized.post<AssembleOrderResponse>(
//         `/api/assemblies/${id}/assemble-product`,
//         values
//     );
// }
// export function finishAssemble(id: number) {
//     return axiosAuthorized.post<any>(`/api/assemblies/${id}/finish`);
// }

// export function packageProducts(id: number) {
//     return axiosAuthorized.post<any>(`/api/order-packages/${id}/start`);
// }
export function orderStatus(values: ProductStatusChangeRequest[]) {
    return axiosAuthorized.put(
        `/api/supplier-box-product/order/employee/status/`,
        values
    );
}
