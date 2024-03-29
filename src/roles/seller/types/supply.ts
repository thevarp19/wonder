import { GetBoxesResponse } from "@/roles/admin/types/api";
import { SellerProductsResponse } from "./api";

export interface ProductQuantity {
    quantity: number;
    product: SellerProductsResponse;
}

export interface SupplyPack {
    products: ProductQuantity[];
    box: GetBoxesResponse;
    id: string;
}
