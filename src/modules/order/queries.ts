import { useQuery } from "@tanstack/react-query";
import {
    getAssembleOrderAdmin,
    getAssembleOrderEmployee,
    getAssembleOrderSeller,
    getCancelledOrderAdmin,
    getCancelledOrderEmployee,
    getCancelledOrderSeller,
    getEmployeeOrderById,
    getOrdersAdmin,
    getOrdersEmployee,
    getOrdersSeller,
    getOrdersSellerOwn,
    getPackageOrderAdmin,
    getPackageOrderEmployee,
    getPackageOrderSeller,
    getShippedOrderAdmin,
    getShippedOrderEmployee,
    getShippedOrderSeller,
    getTransferOrderAdmin,
    getTransferOrderEmployee,
    getTransferOrderSeller,
} from "./api";
import {
    DeliveryMode,
    GetAssembleOrders,
    GetAssembleOrdersEmployee,
    GetCancelledOrders,
    GetOrderDetailEmployee,
    GetOrdersAdmin,
    GetOrdersEmployee,
    GetOrdersSeller,
    GetPackageOrders,
    GetPackageOrdersEmployee,
    GetShippedOrders,
    GetTransferOrders,
    GetTransferOrdersEmployee,
} from "./types";

export const useGetOrdersAdmin = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersAdmin>({
        queryKey: [`orders-admin`, page, size, searchValue, deliveryMode],
        queryFn: async () => {
            const { data } = await getOrdersAdmin(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};

export const useGetOrdersSeller = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersSeller>({
        queryKey: ["seller-orders", page, size, searchValue, deliveryMode],
        queryFn: async () => {
            const { data } = await getOrdersSeller(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetOrdersSellerOwn = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersSeller>({
        queryKey: ["seller-own-orders", page, size, searchValue, deliveryMode],
        queryFn: async () => {
            const { data } = await getOrdersSellerOwn(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};

export const useGetOrdersEmployee = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersEmployee>({
        queryKey: ["orders-employee", page, size, searchValue, deliveryMode],
        queryFn: async () => {
            const { data } = await getOrdersEmployee(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetAssembleOrderEmployee = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetAssembleOrdersEmployee>({
        queryKey: [
            "orders-employee-assemble",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getAssembleOrderEmployee(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetAssembleOrderSeller = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetAssembleOrders>({
        queryKey: [
            "orders-seller-assemble",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getAssembleOrderSeller(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetAssembleOrderAdmin = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetAssembleOrders>({
        queryKey: [
            "orders-admin-assemble",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getAssembleOrderAdmin(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetPackageOrderEmployee = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetPackageOrdersEmployee>({
        queryKey: [
            "orders-employee-package",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getPackageOrderEmployee(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetPackageOrderSeller = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetPackageOrders>({
        queryKey: [
            "orders-seller-package",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getPackageOrderSeller(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetPackageOrderAdmin = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetPackageOrders>({
        queryKey: [
            "orders-admin-package",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getPackageOrderAdmin(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetTransferOrderEmployee = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetTransferOrdersEmployee>({
        queryKey: [
            "orders-employee-transfer",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getTransferOrderEmployee(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetTransferOrderSeller = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetTransferOrders>({
        queryKey: [
            "orders-seller-transfer",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getTransferOrderSeller(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetTransferOrderAdmin = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetTransferOrders>({
        queryKey: [
            "orders-admin-transfer",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getTransferOrderAdmin(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetShippedOrderSeller = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetShippedOrders>({
        queryKey: [
            "orders-seller-shipped",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getShippedOrderSeller(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetShippedOrderEmployee = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersEmployee>({
        queryKey: [
            "orders-employee-shipped",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getShippedOrderEmployee(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetShippedOrderAdmin = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetShippedOrders>({
        queryKey: [
            "orders-admin-shipped",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getShippedOrderAdmin(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetCancelledOrderSeller = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetCancelledOrders>({
        queryKey: [
            "orders-seller-cancelled",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getCancelledOrderSeller(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetCancelledOrderEmployee = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersEmployee>({
        queryKey: [
            "orders-employee-cancelled",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getCancelledOrderEmployee(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetCancelledOrderAdmin = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetCancelledOrders>({
        queryKey: [
            "orders-admin-cancelled",
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getCancelledOrderAdmin(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};

export const useGetEmployeeOrder = (id: string) => {
    return useQuery<GetOrderDetailEmployee>({
        queryKey: [`order-detail-employee`, id],
        queryFn: async () => {
            const { data } = await getEmployeeOrderById(id);
            return data;
        },
    });
};
