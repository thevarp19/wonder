export interface ProductPrice {
    cityName: string;
    price: number;
}

export interface GetProductResponse {
    id: number;
    vendorCode: string;
    keycloakUserId: string;
    name: string;
    enabled: boolean;
    prices: ProductPrice[];
}
