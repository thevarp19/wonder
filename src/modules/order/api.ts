import { axiosAuthorized } from "@/lib/axios";
import {
    DeliveryMode,
    GetAdminOrderDetail,
    GetAssembleOrders,
    GetAssembleOrdersEmployee,
    GetCancelledOrders,
    GetEmployeeOrderDetail,
    GetOrderPackageDetails,
    GetOrdersAdmin,
    GetOrdersEmployee,
    GetOrdersSeller,
    GetPackageOrders,
    GetPackageOrdersEmployee,
    GetSellerOrderDetail,
    GetShippedOrders,
    GetTransferOrders,
    GetTransferOrdersEmployee,
    ProductStatusChangeRequest,
} from "./types";

export function getOrdersAdmin(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersAdmin>(
        `/api/order-admin/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}

export function getOrdersSeller(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersSeller>(
        `/api/order-seller/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getOrdersSellerOwn(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersSeller>(
        `/api/order-seller/own/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
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
export function cancelOrderAdmin(
    id: string,
    values: { cancellation_reason: string; cancellation_comment: string }
) {
    return axiosAuthorized.post(`/api/order-admin/cancel/${id}/`, values);
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
export function getAssembleOrderSeller(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetAssembleOrders>(
        `/api/order-seller/assemble/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getAssembleOrderAdmin(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetAssembleOrders>(
        `/api/order-admin/assemble/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
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
export function getPackageOrderSeller(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetPackageOrders>(
        `api/order-seller/packaging/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getPackageOrderAdmin(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetPackageOrders>(
        `api/order-admin/packaging/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
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
export function getTransferOrderSeller(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetTransferOrders>(
        `/api/order-seller/transfer/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getTransferOrderAdmin(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetTransferOrders>(
        `/api/order-admin/transfer/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getShippedOrderSeller(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetShippedOrders>(
        `/api/order-seller/sent/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getShippedOrderEmployee(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersEmployee>(
        `/api/order-employee/sent/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getShippedOrderAdmin(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetShippedOrders>(
        `/api/order-admin/sent/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getCancelledOrderSeller(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetCancelledOrders>(
        `/api/order-seller/cancelled/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getCancelledOrderEmployee(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersEmployee>(
        `/api/order-employee/cancelled/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getCancelledOrderAdmin(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetCancelledOrders>(
        `/api/order-admin/cancelled/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}

export function getPackageDetails(id: string, packed: boolean) {
    return axiosAuthorized.get<GetOrderPackageDetails>(
        `/api/seller-product/calculator/${id}/${packed ? 1 : 0}/`
    );
}
export function getAdminOrderById(id: string) {
    return axiosAuthorized.get<GetAdminOrderDetail>(`/api/order-admin/${id}/`);
}
export function getSellerOrderById(id: string) {
    return axiosAuthorized.get<GetSellerOrderDetail>(
        `/api/order-seller/${id}/`
    );
}
export function getEmployeeOrderById(id: string) {
    return axiosAuthorized.get<GetEmployeeOrderDetail>(
        `/api/order-employee/${id}/`
    );
}

export function orderStatus(values: ProductStatusChangeRequest[]) {
    return axiosAuthorized.put(
        `/api/supplier-box-product/order/employee/status/`,
        values
    );
}
export function orderCodeRequest(id: string) {
    return axiosAuthorized.put(`/api/order-employee/${id}/complete/`);
}
export function orderCodeConfirm(id: string, code: string) {
    return axiosAuthorized.patch(
        `/api/order-employee/${id}/complete/`,
        {},
        {
            headers: {
                "X-Security-Code": code,
            },
        }
    );
}
