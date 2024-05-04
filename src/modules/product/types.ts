import { BasePaginationResponse } from "@/types";

export interface ProductPrice {
    cityName: string;
    price: number;
}

export interface GetProductResponse
    extends BasePaginationResponse<GetProductContent> {}

export interface GetProductContent {
    id: number;
    vendorCode: string;
    keycloakUserId: string;
    name: string;
    enabled: boolean;
    prices: ProductPrice[];
}
