import { axiosAuthorized } from "@/lib/axios";
import { GetProductResponse } from "./types";

export function createProductsFromFile(formData: FormData) {
    return axiosAuthorized.post<GetProductResponse[]>(
        "/api/products",
        formData
    );
}

export function getProducts(page: number = 0, size: number = 10) {
    return axiosAuthorized.get<GetProductResponse>(
        `/api/products?page=${page}&size=${size}`
    );
}
