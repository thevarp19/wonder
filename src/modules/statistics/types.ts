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
