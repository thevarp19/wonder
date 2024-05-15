import { axiosAuthorized } from "@/lib/axios";
import {
    ChangeProductPriceRequest,
    GetProductContent,
    GetProductPricesResponse,
    GetProductResponse,
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
    let url = `/api/products?page=${page}&size=${size}&searchValue=${searchValue}&sortBy=id`;
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

export function changeProductPrice(
    vendorCode: string,
    value: ChangeProductPriceRequest[]
) {
    return axiosAuthorized.patch<void>(`/api/products/${vendorCode}`, value);
}
