import { axiosAuthorized } from "@/lib/axios";
import { GetProductResponse } from "./types";

export function createProductsFromFile(formData: FormData) {
    return axiosAuthorized.post<GetProductResponse[]>(
        "/api/products",
        formData
    );
}

export function getProducts() {
    return axiosAuthorized.get<GetProductResponse[]>("/api/products");
}
