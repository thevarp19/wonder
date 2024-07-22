import { axiosAuthorized } from "@/lib/axios";
import { UpdateProductSizeRequest } from "../store/types";
import {
    ChangeProductPriceRequest,
    GetProductContent,
    GetProductCoverResponse,
    GetProductPricesResponse,
    GetProductsByParamsResponse,
    GetProductsWithSizesResponse,
    ProductEnabledCount,
    ProductStoreCity,
} from "./types";

export function createProductsFromFile(formData: FormData, importType: string) {
    return axiosAuthorized.post(
        `/api/product/import-file/?import_type=${importType}`,
        formData
    );
}

export function getProducts(
    // page: number = 1,
    // size: number = 10,
    // searchValue: string = "",
    isPublished: boolean | null = null,
    cityId: number = 1
) {
    let url = `/api/seller-city-product-price-quantity/?city=${cityId}`;
    if (isPublished !== null) {
        url += `&is_published=${isPublished}`;
    }
    return axiosAuthorized.get<GetProductContent[]>(url);
}

export async function getProductsOptions({
    pageParam = 1,
    pageSize = 10,
    searchValue = "",
}) {
    let url = `/api/seller-product/cover/?page=${pageParam}&size=${pageSize}&title=${searchValue}`;
    const { data } = await axiosAuthorized.get<GetProductCoverResponse>(url);
    return data;
}
export function getProductsPrices(
    page: number = 1,
    size: number = 10,
    // searchValue: string = "",
    cities: number[] = [],
    isPublished: boolean | null = null
) {
    let url = `api/seller-product/?page=${page}&size=${size}`;
    if (isPublished !== null) {
        url += `&is_published=${isPublished}`;
    }
    if (cities.length > 0) {
        url += cities.map((cityId) => `&cities=${cityId}`).join("");
    }

    return axiosAuthorized.get<GetProductPricesResponse>(url);
}

export function changeProductVisibility(
    values: [
        {
            id: number;
            is_published: boolean;
        }
    ]
) {
    return axiosAuthorized.patch(`/api/seller-product/update/`, values);
}
export function updateProductSize(
    id: string,
    values: UpdateProductSizeRequest
) {
    return axiosAuthorized.patch(`/api/products/change-size/${id}`, values);
}

export function changeProductPrice(value: ChangeProductPriceRequest[]) {
    return axiosAuthorized.patch(`/api/seller-product/update/`, value);
}
export function getSellerActiveCities() {
    return axiosAuthorized.get<ProductStoreCity[]>(
        `/api/city/seller-warehouse-enabled/`
    );
}
export function getEnabledCount() {
    return axiosAuthorized.get<ProductEnabledCount>(
        `/api/seller-product/enabled-count/`
    );
}

export function getProductsWithSizes(
    page: number = 1,
    size: number = 10,
    searchValue: string = "",
    byVendorCode: boolean = false,
    byProductName: boolean = false
) {
    let url = `/api/products/get-with-sizes?searchValue=${searchValue}&byVendorCode=${byVendorCode}&byProductName=${byProductName}&page=${page}&size=${size}`;
    return axiosAuthorized.get<GetProductsWithSizesResponse>(url);
}
export function getProductsByParams(
    page: number = 1,
    size: number = 10,
    searchValue: string = "",
    byVendorCode: boolean = false,
    byProductName: boolean = false
) {
    let url = `/api/products/search-by-params?searchValue=${searchValue}&byVendorCode=${byVendorCode}&byProductName=${byProductName}&page=${page}&size=${size}`;
    return axiosAuthorized.get<GetProductsByParamsResponse>(url);
}
