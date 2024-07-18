import { axiosAuthorized } from "@/lib/axios";
import { UpdateProductSizeRequest } from "../store/types";
import {
    ChangeProductPriceRequest,
    GetProductPricesResponse,
    GetProductResponse,
    GetProductsByParamsResponse,
    GetProductsWithSizesResponse,
} from "./types";

export function createProductsFromFile(formData: FormData) {
    return axiosAuthorized.post("/api/product/create-by-file/", formData);
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

export async function getProductsOptions({
    pageParam = 0,
    pageSize = 10,
    searchValue = "",
}) {
    let url = `/api/products?page=${pageParam}&size=${pageSize}&searchValue=${searchValue}&sortBy=id`;
    const { data } = await axiosAuthorized.get<GetProductResponse>(url);
    return data;
}
export function getProductsPrices(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    isPublished: boolean | null = null
) {
    let url = `/api/seller-product/prices?page=${page}&size=${size}&searchValue=${searchValue}&sortBy=id/`;
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
    byVendorCode: boolean = false,
    byProductName: boolean = false
) {
    let url = `/api/products/get-with-sizes?searchValue=${searchValue}&byVendorCode=${byVendorCode}&byProductName=${byProductName}&page=${page}&size=${size}`;
    return axiosAuthorized.get<GetProductsWithSizesResponse>(url);
}
export function getProductsByParams(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    byVendorCode: boolean = false,
    byProductName: boolean = false
) {
    let url = `/api/products/search-by-params?searchValue=${searchValue}&byVendorCode=${byVendorCode}&byProductName=${byProductName}&page=${page}&size=${size}`;
    return axiosAuthorized.get<GetProductsByParamsResponse>(url);
}
