import { BasePaginationResponse } from "@/types";

export interface GetReports extends BasePaginationResponse<GetReportsContent> {}

export interface GetReportsContent {
    id: number;
    seller?: string;
    store_name?: string;
    check_url: string;
    created_at: string;
}
export interface GetEmployeeStores {
    pk: number;
    kaspi_seller_id: string;
    kaspi_store_name: string;
}
export interface CreateEmployeeReportRequest {
    check_url: string;
    created_at: string;
    seller: number;
}
