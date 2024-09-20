import { axiosAuthorized } from "@/lib/axios";
import {
    AssembleDeliveryMode,
    DeliveryMode,
    GetAdminOrderDetail,
    GetAssembleOrderProductEmployee,
    GetAssembleOrders,
    GetAssembleOrdersEmployee,
    GetCancelledOrders,
    GetEmployeeOrderDetail,
    GetEmployeeRefunds,
    GetNewSignOrders,
    GetOrderPackageDetails,
    GetOrdersAdmin,
    GetOrdersEmployee,
    GetOrdersSeller,
    GetOwnOrdersPickup,
    GetPackageOrders,
    GetPackageOrdersEmployee,
    GetSellerOrderDetail,
    GetShippedOrders,
    GetTransferOrders,
    GetTransferOrdersEmployee,
    ProductStatusChangeRequest,
    RefundMode,
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
export function getExportRefundsFile(refundMode: string) {
    return axiosAuthorized.get(
        `/api/refunds/merchants/export-as-pdf/?tab=${refundMode}`,
        {
            responseType: "blob",
        }
    );
}

export function getOrdersAdminArchive(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersAdmin>(
        `/api/order-admin/archive/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getOrdersSellerArchive(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersSeller>(
        `/api/order-seller/archive/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
    );
}
export function getNewOrdersSeller(
    page: number = 0,
    size: number = 10
    // searchValue: string = "",
    // deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetNewSignOrders>(
        `/api/order-seller/new/?page=${page}&size=${size}`
    );
}
export function getEmployeeRefunds(refundMode: RefundMode = "NEW") {
    return axiosAuthorized.get<GetEmployeeRefunds[]>(
        `/api/refunds/merchants/?tab=${refundMode}`
    );
}
export function getOwnPickupOrdersSeller(
    page: number = 0,
    size: number = 10
    // searchValue: string = "",
    // deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOwnOrdersPickup>(
        `/api/order-seller/own/pickup/?page=${page}&size=${size}`
    );
}
export function getSignOrdersSeller(
    page: number = 0,
    size: number = 10
    // searchValue: string = "",
    // deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetNewSignOrders>(
        `/api/order-seller/sign-required/?page=${page}&size=${size}`
    );
}
export function getOrdersEmployeeArchive(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL"
) {
    return axiosAuthorized.get<GetOrdersEmployee>(
        `/api/order-employee/archive/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}`
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
export function getOrdersSellerOwnByType(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "ALL",
    type: string
) {
    return axiosAuthorized.get<GetOrdersSeller>(
        `/api/order-seller/own/kaspi/?page=${page}&size=${size}&search=${searchValue}&state=${deliveryMode}&status=${type}`
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
export function replacementOrderProductEmployee(
    productId: number,
    reason: "LOST" | "DEFECTIVE"
) {
    return axiosAuthorized.post<GetAssembleOrderProductEmployee>(
        `/api/supplier-box-product/order/employee/assemble/order-product/replacement/${productId}/`,
        { reason: reason }
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
export function getAssembleOrderProductEmployee(
    page: number = 0,
    deliveryMode: AssembleDeliveryMode = "EXPRESS"
) {
    return axiosAuthorized.get<GetAssembleOrderProductEmployee>(
        `/api/supplier-box-product/order/employee/assemble/order-product/?index=${page}&delivery_type=${deliveryMode}`
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

export function getPackageProduct(id: string, packed: boolean) {
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
