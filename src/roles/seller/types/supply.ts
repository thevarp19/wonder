import { GetBoxResponse } from "@/modules/box/types";
import { GetProductContent } from "@/modules/product/types";

export interface ProductQuantity {
    quantity: number;
    product: GetProductContent;
}

export interface PackProduct {
    id: string;
    product: GetProductContent;
    quantity: number;
}

export interface SupplyPack {
    products: PackProduct[];
    box: GetBoxResponse;
    id: string;
}
