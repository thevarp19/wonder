import { BasePaginationResponse } from "@/types";

export interface ProductPrice {
    cityId: number;
    cityName: string;
    price: number;
    count: number;
}

export interface ProductWithPrices {
    id: number;
    count: number;
    name: string;
    published: boolean;
    vendorCode: string;
    prices: ProductPrice[];
}

export interface GetProductResponse
    extends BasePaginationResponse<GetProductContent> {}

export interface GetProductPricesResponse
    extends BasePaginationResponse<GetProductPricesContent> {}

export interface GetProductPricesContent {
    cities: ProductPriceCity[];
    products: ProductWithPrices[];
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

export interface ProductPrice2 {
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
