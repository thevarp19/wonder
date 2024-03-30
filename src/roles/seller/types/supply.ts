import { GetBoxResponse } from "@/modules/box/types";
import { GetProductResponse } from "@/modules/product/types";

export interface ProductQuantity {
    quantity: number;
    product: GetProductResponse;
}

export interface SupplyPack {
    products: ProductQuantity[];
    box: GetBoxResponse;
    id: string;
}
