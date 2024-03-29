import {
    GetBoxesResponse,
    GetStoresWithDetailsResponse,
} from "@/modules/admin/types/api";
import { SellerProductsResponse } from "./api";

export interface ProductQuantity {
    quantity: number;
    product: SellerProductsResponse;
}

export interface SupplyPack {
    products: ProductQuantity[];
    store: GetStoresWithDetailsResponse;
    box: GetBoxesResponse;
    data: string;
    id: string;
}
