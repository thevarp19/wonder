import { axiosAuthorized, axiosAuthorizedAutoUpload } from "@/lib/axios";
import { LoginRequest } from "../auth/types";
import { UpdateProductSizeRequest } from "../store/types";
import {
    ChangeProductPriceRequest,
    GetProductCoverResponse,
    GetProductPricesResponse,
    GetProductResponse,
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

export function getProductsQuantity(
    page: number = 0,
    size: number = 10,
    cityId: number,
    isPublished: boolean | null = true
) {
    let url = `/api/seller-product/warehose-quantity/?page=${page}&size=${size}&city=${cityId}`;
    if (isPublished !== null) {
        url += `&is_published=${isPublished}`;
    }
    return axiosAuthorized.get<GetProductResponse>(url);
}

export async function getProductsOptions({
    pageParam = 0,
    pageSize = 10,
    searchValue = "",
    isPublished,
}: {
    pageParam?: number;
    pageSize?: number;
    searchValue?: string;
    isPublished?: boolean | null;
}): Promise<GetProductCoverResponse> {
    let url = `/api/seller-product/cover/v2/?page=${pageParam}&size=${pageSize}&search=${searchValue}`;
    if (isPublished !== undefined) {
        url += `&is_published=${isPublished}`;
    }
    const { data } = await axiosAuthorized.get<GetProductCoverResponse>(url);
    return data;
}
export function getProductsPrices(
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    cities: number[] = [],
    isPublished: boolean | null = null
) {
    let url = `api/seller-product/?page=${page}&size=${size}&search=${searchValue}`;
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
    id: number,
    values: UpdateProductSizeRequest
) {
    return axiosAuthorized.patch(`/api/product-size/${id}/`, values);
}
export function createProductSize(
    id: number,
    values: UpdateProductSizeRequest
) {
    return axiosAuthorized.post(`/api/product-size/`, {
        ...values,
        product: id,
    });
}
export function autoUploadProductData(values: LoginRequest) {
    return axiosAuthorizedAutoUpload.post(`/products/import-products`, values);
}
export function updateImport() {
    return axiosAuthorized.post(`/api/seller-product/import-update/`);
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
export function getExportFile() {
    return axiosAuthorized.get(`/api/seller-product-quantity/export-xlsx/`, {
        responseType: "blob",
    });
}
export function getProductsWithSizes(
    page: number = 0,
    size: number = 10,
    search: string = "",
    hasSizes: boolean | null = null
) {
    let url = `/api/product/sizes/?page=${page}&size=${size}&search=${search}`;
    if (hasSizes !== null) {
        url += `&has_size=${hasSizes}`;
    }
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
