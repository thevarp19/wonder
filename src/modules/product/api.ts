import { axiosAuthorized } from "@/lib/axios";
import { UpdateProductSizeRequest } from "../store/types";
import {
    ChangeProductPriceRequest,
    GetProductContent,
    GetProductPricesResponse,
    GetProductResponse,
    GetProductsByParamsResponse,
    GetProductsWithSizesResponse,
} from "./types";

export function createProductsFromFile(formData: FormData) {
    return axiosAuthorized.post<GetProductContent[]>("/api/products", formData);
}

export function getProducts(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    isPublished: boolean | null = null
) {
    let url = `/api/products?page=${page}&size=${size}&searchValue=${searchValue}&sortBy=id`;
    if (isPublished !== null) {
        url += `&isPublished=${isPublished}`;
    }
    return axiosAuthorized.get<GetProductResponse>(url);
}

export function getProductsPrices(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    isPublished: boolean | null = null
) {
    let url = `/api/products/prices?page=${page}&size=${size}&searchValue=${searchValue}&sortBy=id`;
    if (isPublished !== null) {
        url += `&isPublished=${isPublished}`;
    }
    return axiosAuthorized.get<GetProductPricesResponse>(url);
}

export function changeProductVisibility(id: number, isVisible: boolean) {
    return axiosAuthorized.patch<void>(
        `/api/products/publish?productId=${id}&isPublished=${isVisible}`
    );
}
export function updateProductSize(
    id: string,
    values: UpdateProductSizeRequest
) {
    return axiosAuthorized.patch(`/api/products/change-size/${id}`, values);
}

export function changeProductPrice(value: ChangeProductPriceRequest) {
    return axiosAuthorized.patch<void>(`/api/products/price`, value);
}

export function getProductsWithSizes(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    byArticle: boolean = false,
    byVendorCode: boolean = false,
    byProductName: boolean = false,
    byShopName: boolean = false,
    byCellCode: boolean = false
) {
    let url = `/api/products/get-with-sizes?searchValue=${searchValue}&byArticle=${byArticle}&byVendorCode=${byVendorCode}&byProductName=${byProductName}&byShopName=${byShopName}&byCellCode=${byCellCode}&page=${page}&size=${size}`;
    return axiosAuthorized.get<GetProductsWithSizesResponse>(url);
}
export function getProductsByParams(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    byArticle: boolean = false,
    byVendorCode: boolean = false,
    byProductName: boolean = false,
    byShopName: boolean = false,
    byCellCode: boolean = false
) {
    let url = `/api/products/search-by-params?searchValue=${searchValue}&byArticle=${byArticle}&byVendorCode=${byVendorCode}&byProductName=${byProductName}&byShopName=${byShopName}&byCellCode=${byCellCode}&page=${page}&size=${size}`;
    return axiosAuthorized.get<GetProductsByParamsResponse>(url);
}
