import { BasePaginationResponse } from "@/types";

export interface GetAdminReplenishmentResponse
    extends BasePaginationResponse<GetAdminReplenishmentContent> {}

export interface GetSellerReplenishmentResponse
    extends BasePaginationResponse<GetSellerReplenishmentContent> {}
export interface GetSellerBalanceStatementResponse
    extends BasePaginationResponse<GetSellerBalanceStatementContent> {}

export interface GetSellerBalanceStatementContent {
    id: string;
    code: string;
    delivery_mode: string;
    creation_date: number;
    transmission_date: string;
    receiving_date: number;
    total_price: number;
    wonder_status: string;
    warehouse: string;
    service_cost: string;
}
export interface GetAdminReplenishmentContent {
    id: number;
    seller: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        kaspi_store_name: string;
        balance: string;
    };
    iban: string;
    amount: number;
    check_url: string;
    created_at: string;
    completed_at: string;
    status: string;
}

export interface GetSellerReplenishmentContent {
    id: number;
    iban: string;
    amount: number;
    check_url: string;
    created_at: string;
    completed_at: string;
    status: string;
}
export interface AddReplenishmentRequest {
    iban: string;
    amount: number;
}
