import { axiosAuthorized } from "@/lib/axios";
import {
    GetProductContent,
    GetProductPricesResponse,
    GetProductResponse,
} from "./types";

export function createProductsFromFile(formData: FormData) {
    return axiosAuthorized.post<GetProductContent[]>("/api/products", formData);
}

export function getProducts(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetProductResponse>(
        `/api/products?page=${page}&size=${size}`
    );
}

export function getProductsPrices(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetProductPricesResponse>(
        `/api/products/prices?page=${page}&size=${size}`
    );
}
