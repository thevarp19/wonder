export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

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

export interface SellerRegisterResponse {
    message: string;
}
