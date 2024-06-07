import { useQuery } from "@tanstack/react-query";
import { getSalesInfo, getSellerProductCount } from "./api";
import {
    DurationType,
    GetProductCountResponse,
    GetSalesInfoResponse,
} from "./types";

export const useGetAdminSalesInfo = (duration: DurationType) => {
    return useQuery<GetSalesInfoResponse>({
        queryKey: [`salesInfoAdmin`, duration],
        queryFn: async () => {
            const { data } = await getSalesInfo(duration);
            return data;
        },
    });
};
export const useGetSellerProductCount = (
    page: number = 0,
    size: number = 10
) => {
    return useQuery<GetProductCountResponse>({
        queryKey: [`productCount`, page, size],
        queryFn: async () => {
            const { data } = await getSellerProductCount(page, size);
            return data;
        },
    });
};
