import { BasePaginationResponse } from "@/types";

export interface ProductPrice {
    cityName: string;
    price: number;
}

export interface GetProductResponse
    extends BasePaginationResponse<GetProductContent> {}

export interface GetProductPricesResponse
    extends BasePaginationResponse<GetProductPricesContent> {}

export interface GetProductPricesContent {
    cities: ProductPriceCity[];
    products: ProductPrice[];
}

export interface ProductPriceCity {
    id: number;
    name: string;
    code: string;
    enabled: true;
}

export interface ChangeProductPriceRequest {
    cityId: number;
    price: number;
}

export interface ProductPrice {
    id: number;
    vendorCode: string;
    name: string;
    count: number;
    prices: {
        cityId: number;
        cityName: string;
        price: number;
    }[];
}

export interface GetProductContent {
    id: number;
    vendorCode: string;
    keycloakUserId: string;
    name: string;
    enabled: boolean;
    prices: ProductPrice[];
}
