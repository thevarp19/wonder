import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsPrices } from "./api";
import { GetProductPricesResponse, GetProductResponse } from "./types";

export const useGetProducts = (page: number = 0, size: number = 10) => {
    return useQuery<GetProductResponse>({
        queryKey: [`products`, page, size],
        queryFn: async () => {
            const { data } = await getProducts(page, size);
            return data;
        },
    });
};

export const useGetProductsPrices = (page: number = 0, size: number = 10) => {
    return useQuery<GetProductPricesResponse>({
        queryKey: [`products-prices`, page, size],
        queryFn: async () => {
            const { data } = await getProductsPrices(page, size);
            return data;
        },
    });
};
