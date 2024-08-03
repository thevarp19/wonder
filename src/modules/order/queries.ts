import { useQuery } from "@tanstack/react-query";
import {
    getAdminOrderById,
    getAssembleOrderEmployee,
    getEmployeeOrderById,
    getOrdersAdmin,
    getOrdersEmployee,
    getOrdersSeller,
    getPackageOrderEmployee,
    getSellerOrderById,
    getTransferOrderEmployee,
} from "./api";
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
} from "./types";

export const useGetOrdersAdmin = (
    page: number = 1,
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

// export const useGetOrdersByDate = (startDate: string, endDate: string) => {
//     return useQuery<GetOrdersByDate[]>({
//         queryKey: ["orders", startDate, endDate],
//         queryFn: async () => {
//             const { data } = await getOrdersByDate(startDate, endDate);
//             return data
//                 .filter((order) => order.waybill !== null)
//                 .sort((a, b) => b.creationDate - a.creationDate);
//         },
//     });
// };

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

export const useGetOrdersEmployee = (
    page: number = 1,
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
    page: number = 1,
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
export const useGetTransferOrderEmployee = (
    page: number = 1,
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
export const useGetPackageOrderEmployee = (
    page: number = 1,
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

// export const useGetOrderDetailEmployee = (id: number) => {
//     return useQuery<GetOrderDetailEmployee[]>({
//         queryKey: [`order-employee-${id}`],
//         queryFn: async () => {
//             const { data } = await getEmployeeOrderById(id);
//             return data;
//         },
//     });
// };

export const useGetAdminOrder = (id: number) => {
    return useQuery<GetOrderById[]>({
        queryKey: [`order-admin-${id}`],
        queryFn: async () => {
            const { data } = await getAdminOrderById(id);
            return data;
        },
    });
};
export const useGetSellerOrder = (id: number) => {
    return useQuery<GetOrderById[]>({
        queryKey: [`order-admin-${id}`],
        queryFn: async () => {
            const { data } = await getSellerOrderById(id);
            return data;
        },
    });
};

export const useGetEmployeeOrder = (id: number) => {
    return useQuery<GetOrderDetailEmployee>({
        queryKey: [`order-employee-${id}`],
        queryFn: async () => {
            const { data } = await getEmployeeOrderById(id);
            return data;
        },
    });
};
