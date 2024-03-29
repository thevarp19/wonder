import { axiosAuthorized } from "@/lib/axios";
import { SellerProductsResponse } from "../types/api";

export async function getSellerProducts() {
    return axiosAuthorized.get<SellerProductsResponse[]>("/api/products");
}
