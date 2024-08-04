import { BasePaginationResponse } from "@/types";

export interface HeaderItem {
    title: string;
    value: string;
    percentage: number;
}

export interface CheckItem {
    day: string;
    total_value: number;
}

export interface WeeklyOrderItem {
    day: number;
    total_value: number;
}

export interface CityAnalyticsItem {
    city: string;
    order_count: number;
    percentage: string;
}

export interface TopStore {
    pk: number;
    kaspi_store_name: string;
}

export interface AnalyticsData {
    header: HeaderItem[];
    check: CheckItem[];
    weekly_order: WeeklyOrderItem[];
    city_analytics: CityAnalyticsItem[];
    top_stores: TopStore[];
}
export interface GetLastOrdersResponse
    extends BasePaginationResponse<GetLastOrdersContent> {}
export interface GetLastOrdersContent {
    id: number;
    product_vendor_code: string;
    product_title: string;
    order_code: string;
    store_name: string;
    price: string;
    warehouse: string;
    order_entry: string;
}

export type DurationType = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
