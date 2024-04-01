import { GetBoxResponse } from "@/modules/box/types";
import { GetProductResponse } from "@/modules/product/types";

export interface ProductQuantity {
    quantity: number;
    product: GetProductResponse;
}

export interface PackProduct {
    id: string;
    product: GetProductResponse;
    quantity: number;
}

export interface SupplyPack {
    products: PackProduct[];
    box: GetBoxResponse;
    id: string;
}
