import { useQuery } from "@tanstack/react-query";
import {
    getProducts,
    getProductsByParams,
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
export const useGetProductsWithSizes = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    byArticle: boolean = true,
    byVendorCode: boolean = true,
    byProductName: boolean = true,
    byShopName: boolean = true,
    byCellCode: boolean = true
) => {
    return useQuery<GetProductsWithSizesResponse>({
        queryKey: [
            `productsWithSizes`,
            page,
            size,
            searchValue,
            byArticle,
            byVendorCode,
            byProductName,
            byShopName,
            byCellCode,
        ],
        queryFn: async () => {
            const { data } = await getProductsWithSizes(
                page,
                size,
                searchValue,
                byArticle,
                byVendorCode,
                byProductName,
                byShopName,
                byCellCode
            );
            return data;
        },
    });
};

export const useGetProductsByParams = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    byArticle: boolean = true,
    byVendorCode: boolean = true,
    byProductName: boolean = true,
    byShopName: boolean = true,
    byCellCode: boolean = true
) => {
    return useQuery<GetProductsByParamsResponse>({
        queryKey: [
            `productsByParams`,
            page,
            size,
            searchValue,
            byArticle,
            byVendorCode,
            byProductName,
            byShopName,
            byCellCode,
        ],
        queryFn: async () => {
            const { data } = await getProductsByParams(
                page,
                size,
                searchValue,
                byArticle,
                byVendorCode,
                byProductName,
                byShopName,
                byCellCode
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
