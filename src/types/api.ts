export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface CityResponse {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    code: string;
    enabled: boolean;
}
