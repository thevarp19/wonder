import { BasePaginationResponse } from "@/types";

export interface GetSalesInfoResponse {
    ordersInfo: StatisticsInfo;
    sellersInfo: StatisticsInfo;
    suppliesInfo: StatisticsInfo;
    incomeInfo: StatisticsInfo;
}
export interface StatisticsInfo {
    count: number;
    percent: number;
}
export type DurationType = "DAY" | "WEEK" | "MONTH" | "YEAR";

export interface GetProductCountResponse
    extends BasePaginationResponse<GetProductCount> {}

export interface GetProductCount {
    article: string;
    name: string;
    count: number;
    storeId: number;
    storeFormattedAddress: string;
}
