export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
}

export interface SellerRegisterRequest {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    kaspi_store_name: string;
    kaspi_seller_id: string;
    kaspi_token: string;
}

export interface SellerRegisterResponse {
    message: string;
}
