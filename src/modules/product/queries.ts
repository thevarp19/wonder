import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    getEnabledCount,
    getProducts,
    getProductsByParams,
    getProductsOptions,
    getProductsPrices,
    getProductsWithSizes,
    getSellerActiveCities,
} from "./api";
import {
    GetProductContent,
    GetProductCoverResponse,
    GetProductPricesResponse,
    GetProductsByParamsResponse,
    GetProductsWithSizesResponse,
    ProductEnabledCount,
    ProductStoreCity,
} from "./types";

export const useGetProducts = (
    // page: number = 0,
    // size: number = 10,
    // searchValue: string = "",
    isPublished: boolean | null = null
) => {
    return useQuery<GetProductContent[]>({
        queryKey: [`products`, isPublished],
        queryFn: async () => {
            const { data } = await getProducts(
                // page,
                // size,
                // searchValue,
                isPublished
            );
            return data;
        },
    });
};
export const useInfiniteGetProducts = (pageSize = 10, searchValue = "") => {
    return useInfiniteQuery<GetProductCoverResponse>({
        queryKey: ["products", searchValue],
        queryFn: ({ pageParam = 1 }: any) =>
            getProductsOptions({
                pageParam,
                pageSize,
                searchValue,
            }),
        initialPageParam: 1,
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
    page: number = 1,
    size: number = 10,
    cities: number[] = [],
    // searchValue: string = "",
    isPublished: boolean | null = null
) => {
    return useQuery<GetProductPricesResponse>({
        queryKey: [`products-prices`, page, size, isPublished, cities],
        queryFn: async () => {
            const { data } = await getProductsPrices(
                page,
                size,
                // searchValue,
                cities,
                isPublished
            );
            return data;
        },
    });
};
export const useGetActiveCities = () => {
    return useQuery<ProductStoreCity[]>({
        queryKey: [`active-cities`],
        queryFn: async () => {
            const { data } = await getSellerActiveCities();
            return data;
        },
    });
};
export const useGetEnabledProductCount = () => {
    return useQuery<ProductEnabledCount>({
        queryKey: [`enabled-product-count`],
        queryFn: async () => {
            const { data } = await getEnabledCount();
            return data;
        },
    });
};
