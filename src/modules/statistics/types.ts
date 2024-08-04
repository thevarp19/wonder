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

export type DurationType = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
