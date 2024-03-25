import { SellerProductsResponse } from "./api";

export interface ProductQuantity {
    quantity: number;
    product: SellerProductsResponse;
}

export interface SupplyPack {
    products: ProductQuantity[];
}
