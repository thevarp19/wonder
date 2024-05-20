import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsPrices } from "./api";
import { GetProductPricesResponse, GetProductResponse } from "./types";

export const useGetProducts = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    isPublished: boolean | null = null
) => {
    return useQuery<GetProductResponse>({
        queryKey: [`products`, page, size, searchValue, isPublished],
        queryFn: async () => {
            const { data } = await getProducts(
                page,
                size,
                searchValue,
                isPublished
            );
            return data;
        },
    });
};

export const useGetProductsPrices = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    isPublished: boolean | null = null
) => {
    return useQuery<GetProductPricesResponse>({
        queryKey: [`products-prices`, page, size, searchValue, isPublished],
        queryFn: async () => {
            const { data } = await getProductsPrices(
                page,
                size,
                searchValue,
                isPublished
            );
            return data;
        },
    });
};
