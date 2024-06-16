import { axiosAuthorized } from "@/lib/axios";
import {
    AssembleOrderResponse,
    DeliveryMode,
    GetOrderById,
    GetOrderDetailEmployee,
    GetOrdersAdmin,
    GetOrdersByDate,
    GetOrdersEmployee,
    GetOrdersSeller,
} from "./types";

export function getOrdersAdmin(
    startDate: string,
    endDate: string,
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "",
    byOrderCode: boolean = false,
    byShopName: boolean = false,
    byStoreAddress: boolean = false,
    byProductName: boolean = true,
    byProductArticle: boolean = false,
    byProductVendorCode: boolean = false
) {
    return axiosAuthorized.get<GetOrdersAdmin>(
        `/api/orders/admin?start-date=${startDate}&end-date=${endDate}&page=${page}&size=${size}&searchValue=${searchValue}&deliveryMode=${deliveryMode}&byOrderCode=${byOrderCode}&byShopName=${byShopName}&byStoreAddress=${byStoreAddress}&byProductName=${byProductName}&byProductArticle=${byProductArticle}&byProductVendorCode=${byProductVendorCode}`
    );
}

export function getOrdersByDate(startDate: string, endDate: string) {
    return axiosAuthorized.get<GetOrdersByDate[]>(
        `/api/orders/admin?start-date=${startDate}&end-date=${endDate}`
    );
}

export function getOrdersSeller(
    startDate: string,
    endDate: string,
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "",
    byOrderCode: boolean = false,
    byShopName: boolean = false,
    byStoreAddress: boolean = false,
    byProductName: boolean = true,
    byProductArticle: boolean = false,
    byProductVendorCode: boolean = false
) {
    return axiosAuthorized.get<GetOrdersSeller>(
        `/api/orders/seller?start-date=${startDate}&end-date=${endDate}&page=${page}&size=${size}&searchValue=${searchValue}&deliveryMode=${deliveryMode}&byOrderCode=${byOrderCode}&byShopName=${byShopName}&byStoreAddress=${byStoreAddress}&byProductName=${byProductName}&byProductArticle=${byProductArticle}&byProductVendorCode=${byProductVendorCode}`
    );
}

export function getOrdersEmployee(
    startDate: string,
    endDate: string,
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode = "",
    byOrderCode: boolean = false,
    byShopName: boolean = false,
    byStoreAddress: boolean = false,
    byProductName: boolean = true,
    byProductArticle: boolean = false,
    byProductVendorCode: boolean = false
) {
    return axiosAuthorized.get<GetOrdersEmployee>(
        `/api/orders/employee?start-date=${startDate}&end-date=${endDate}&page=${page}&size=${size}&searchValue=${searchValue}&deliveryMode=${deliveryMode}&byOrderCode=${byOrderCode}&byShopName=${byShopName}&byStoreAddress=${byStoreAddress}&byProductName=${byProductName}&byProductArticle=${byProductArticle}&byProductVendorCode=${byProductVendorCode}`
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
