import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    getEnabledCount,
    getExportFile,
    getProductsByParams,
    getProductsOptions,
    getProductsPrices,
    getProductsQuantity,
    getProductsWithSizes,
    getSellerActiveCities,
} from "./api";
import {
    GetProductCoverResponse,
    GetProductPricesResponse,
    GetProductResponse,
    GetProductsByParamsResponse,
    GetProductsWithSizesResponse,
    ProductEnabledCount,
    ProductStoreCity,
} from "./types";

export const useGetProducts = (
    page: number = 0,
    size: number = 10,
    cityId: number,
    isPublished: boolean | null
) => {
    return useQuery<GetProductResponse>({
        queryKey: [`products-quantity`, page, size, cityId, isPublished],
        queryFn: async () => {
            const { data } = await getProductsQuantity(
                page,
                size,
                cityId,
                isPublished
            );
            return data;
        },
    });
};
export const useInfiniteGetProducts = (
    pageSize: number = 10,
    searchValue: string = "",
    isPublished?: boolean | null
) => {
    return useInfiniteQuery<GetProductCoverResponse>({
        queryKey: ["products", searchValue, pageSize, isPublished],
        queryFn: ({ pageParam = 0 }: any) =>
            getProductsOptions({
                pageParam,
                pageSize,
                searchValue,
                isPublished,
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
    search: string = "",
    hasSizes: boolean | null = null
) => {
    return useQuery<GetProductsWithSizesResponse>({
        queryKey: [`productsWithSizes`, page, size, search, hasSizes],
        queryFn: async () => {
            const { data } = await getProductsWithSizes(
                page,
                size,
                search,
                hasSizes
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
    cities: number[] = [],
    isPublished: boolean | null = null
) => {
    return useQuery<GetProductPricesResponse>({
        queryKey: [
            `products-prices`,
            page,
            size,
            searchValue,
            cities,
            isPublished,
        ],
        queryFn: async () => {
            const { data } = await getProductsPrices(
                page,
                size,
                searchValue,
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
export const useGetExportFile = () => {
    return useQuery<Blob>({
        queryKey: [`export-file`],
        queryFn: async () => {
            const response = await getExportFile();
            return response.data;
        },
        enabled: false,
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
