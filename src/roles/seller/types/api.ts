export interface SellerRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    sellerName: string;
    sellerId: string;
    tokenKaspi: string;
}

export interface SellerEmailConfirmRequest {
    code: string;
}

export interface SellerProductsResponse {
    id: number;
    vendorCode: string;
    keycloakUserId: string;
    name: string;
    enabled: boolean;
    prices: {
        cityName: string;
        price: number;
    }[];
}
