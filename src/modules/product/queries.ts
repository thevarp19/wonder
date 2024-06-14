import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    getProducts,
    getProductsByParams,
    getProductsOptions,
    getProductsPrices,
    getProductsWithSizes,
} from "./api";
import {
    GetProductPricesResponse,
    GetProductResponse,
    GetProductsByParamsResponse,
    GetProductsWithSizesResponse,
} from "./types";

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
export const useInfiniteGetProducts = (pageSize = 10, searchValue = "") => {
    return useInfiniteQuery<GetProductResponse>({
        queryKey: ["products", searchValue],
        queryFn: ({ pageParam = 0 }: any) =>
            getProductsOptions({
                pageParam,
                pageSize,
                searchValue,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.last ? undefined : lastPage.page + 1;
        },
    });
};

export const useGetProductsWithSizes = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    byVendorCode: boolean = false,
    byProductName: boolean = false
) => {
    return useQuery<GetProductsWithSizesResponse>({
        queryKey: [
            `productsWithSizes`,
            page,
            size,
            searchValue,
            byVendorCode,
            byProductName,
        ],
        queryFn: async () => {
            const { data } = await getProductsWithSizes(
                page,
                size,
                searchValue,
                byVendorCode,
                byProductName
            );
            return data;
        },
    });
};

export const useGetProductsByParams = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    byVendorCode: boolean = false,
    byProductName: boolean = false
) => {
    return useQuery<GetProductsByParamsResponse>({
        queryKey: [
            `productsByParams`,
            page,
            size,
            searchValue,
            byVendorCode,
            byProductName,
        ],
        queryFn: async () => {
            const { data } = await getProductsByParams(
                page,
                size,
                searchValue,
                byVendorCode,
                byProductName
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
