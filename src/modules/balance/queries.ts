import { useQuery } from "@tanstack/react-query";
import {
    getAdminReplenishment,
    getSellerBalanceStatement,
    getSellerReplenishment,
} from "./api";
import {
    GetAdminReplenishmentResponse,
    GetSellerBalanceStatementResponse,
    GetSellerReplenishmentResponse,
} from "./types";

export const useGetAdminReplenishment = (
    page: number = 0,
    size: number = 10,
    searchValue: string = ""
) => {
    return useQuery<GetAdminReplenishmentResponse>({
        queryKey: [`admin-replenishment`, page, size, searchValue],
        queryFn: async () => {
            const { data } = await getAdminReplenishment(
                page,
                size,
                searchValue
            );
            return data;
        },
    });
};
export const useGetSellerReplenishment = (
    page: number = 0,
    size: number = 10
) => {
    return useQuery<GetSellerReplenishmentResponse>({
        queryKey: [`seller-replenishment`, page, size],
        queryFn: async () => {
            const { data } = await getSellerReplenishment(page, size);
            return data;
        },
    });
};
export const useGetSellerBalanceStatement = (
    page: number = 0,
    size: number = 10
) => {
    return useQuery<GetSellerBalanceStatementResponse>({
        queryKey: [`seller-statement`, page, size],
        queryFn: async () => {
            const { data } = await getSellerBalanceStatement(page, size);
            return data;
        },
    });
};
