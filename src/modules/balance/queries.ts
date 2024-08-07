import { useQuery } from "@tanstack/react-query";
import { getAdminReplenishment, getSellerReplenishment } from "./api";
import {
    GetAdminReplenishmentResponse,
    GetSellerReplenishmentResponse,
} from "./types";

export const useGetAdminReplenishment = (
    page: number = 1,
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
    page: number = 1,
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
