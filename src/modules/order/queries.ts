import { useQuery } from "@tanstack/react-query";
import {
    getAdminOrderById,
    getAssembleOrderAdmin,
    getAssembleOrderEmployee,
    getAssembleOrderProductEmployee,
    getAssembleOrderSeller,
    getCancelledOrderAdmin,
    getCancelledOrderEmployee,
    getCancelledOrderSeller,
    getEmployeeOrderById,
    getEmployeeRefunds,
    getExportRefundsFile,
    getNewOrdersSeller,
    getOrdersAdmin,
    getOrdersAdminArchive,
    getOrdersEmployee,
    getOrdersEmployeeArchive,
    getOrdersSeller,
    getOrdersSellerArchive,
    getOrdersSellerOwn,
    getOrdersSellerOwnByType,
    getOwnPickupOrdersSeller,
    getPackageOrderAdmin,
    getPackageOrderEmployee,
    getPackageOrderSeller,
    getPackageProduct,
    getSellerOrderById,
    getShippedOrderAdmin,
    getShippedOrderEmployee,
    getShippedOrderSeller,
    getSignOrdersSeller,
    getTransferOrderAdmin,
    getTransferOrderEmployee,
    getTransferOrderSeller,
} from "./api";
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
    RefundMode,
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

export const useGetExportRefundsFile = (refundMode: string) => {
    return useQuery<Blob>({
        queryKey: [`refunds-export-file`],
        queryFn: async () => {
            const response = await getExportRefundsFile(refundMode);
            return response.data;
        },
        enabled: false,
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
export const useGetOrdersSellerOwnByType = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode,
    type: string
) => {
    return useQuery<GetOrdersSeller>({
        queryKey: [
            "seller-own-orders-type",
            page,
            size,
            searchValue,
            deliveryMode,
            type,
        ],
        queryFn: async () => {
            const { data } = await getOrdersSellerOwnByType(
                page,
                size,
                searchValue,
                deliveryMode,
                type
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
export const useGetOrdersAdminArchive = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersAdmin>({
        queryKey: [
            `orders-admin-archive`,
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getOrdersAdminArchive(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetNewOrdersSeller = (
    page: number = 0,
    size: number = 10
    // searchValue: string = "",
    // deliveryMode: DeliveryMode
) => {
    return useQuery<GetNewSignOrders>({
        queryKey: [`orders-seller-new`, page, size],
        queryFn: async () => {
            const { data } = await getNewOrdersSeller(
                page,
                size
                // searchValue,
                // deliveryMode
            );
            return data;
        },
    });
};
export const useGetOwnPickupOrdersSeller = (
    page: number = 0,
    size: number = 10
    // searchValue: string = "",
    // deliveryMode: DeliveryMode
) => {
    return useQuery<GetOwnOrdersPickup>({
        queryKey: [`orders-seller-own-pickup`, page, size],
        queryFn: async () => {
            const { data } = await getOwnPickupOrdersSeller(
                page,
                size
                // searchValue,
                // deliveryMode
            );
            return data;
        },
    });
};
export const useGetSignOrdersSeller = (
    page: number = 0,
    size: number = 10
    // searchValue: string = "",
    // deliveryMode: DeliveryMode
) => {
    return useQuery<GetNewSignOrders>({
        queryKey: [`orders-seller-sign`, page, size],
        queryFn: async () => {
            const { data } = await getSignOrdersSeller(
                page,
                size
                // searchValue,
                // deliveryMode
            );
            return data;
        },
    });
};
export const useGetOrdersSellerArchive = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersSeller>({
        queryKey: [
            `orders-seller-archive`,
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getOrdersSellerArchive(
                page,
                size,
                searchValue,
                deliveryMode
            );
            return data;
        },
    });
};
export const useGetOrdersEmployeeArchive = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    deliveryMode: DeliveryMode
) => {
    return useQuery<GetOrdersEmployee>({
        queryKey: [
            `orders-employee-archive`,
            page,
            size,
            searchValue,
            deliveryMode,
        ],
        queryFn: async () => {
            const { data } = await getOrdersEmployeeArchive(
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
export const useGetAssembleOrderProductEmployee = (
    page: number = 0,
    deliveryMode: AssembleDeliveryMode
) => {
    return useQuery<GetAssembleOrderProductEmployee>({
        queryKey: ["orders-employee-assemble-product", page, deliveryMode],
        queryFn: async () => {
            const { data } = await getAssembleOrderProductEmployee(
                page,
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

export const useGetPackageProduct = (id: string, packed: boolean) => {
    return useQuery<GetOrderPackageDetails>({
        queryKey: [`order-package-product`, id, packed],
        queryFn: async () => {
            const { data } = await getPackageProduct(id, packed);
            return data;
        },

        retry: 2,
        enabled: packed,
    });
};
export const useGetEmployeeRefunds = (refundMode: RefundMode) => {
    return useQuery<GetEmployeeRefunds[]>({
        queryKey: [`employee-refunds`, refundMode],
        queryFn: async () => {
            const { data } = await getEmployeeRefunds(refundMode);
            return data;
        },
    });
};
export const useGetAdminOrder = (id: string) => {
    return useQuery<GetAdminOrderDetail>({
        queryKey: [`order-detail-admin`, id],
        queryFn: async () => {
            const { data } = await getAdminOrderById(id);
            return data;
        },
    });
};
export const useGetSellerOrder = (id: string) => {
    return useQuery<GetSellerOrderDetail>({
        queryKey: [`order-detail-seller`, id],
        queryFn: async () => {
            const { data } = await getSellerOrderById(id);
            return data;
        },
    });
};
export const useGetEmployeeOrder = (id: string) => {
    return useQuery<GetEmployeeOrderDetail>({
        queryKey: [`order-detail-employee`, id],
        queryFn: async () => {
            const { data } = await getEmployeeOrderById(id);
            return data;
        },
    });
};
