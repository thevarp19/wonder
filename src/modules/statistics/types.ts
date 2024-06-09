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

export interface GetTopSellerResponse
    extends BasePaginationResponse<GetTopSeller> {}

export interface GetTopProductResponse
    extends BasePaginationResponse<GetTopProduct> {}

export interface GetLastOrdersResponse
    extends BasePaginationResponse<GetLastOrders> {}

export interface GetProductCount {
    article: string;
    name: string;
    count: number;
    storeId: number;
    storeFormattedAddress: string;
}
export interface GetTopSeller {
    shopName: string;
    totalIncome: number;
}

export interface GetTopProduct {
    productId: number;
    productName: string;
    productPrice: number;
    count: number;
}
export interface GetLastOrders {
    orderCode: string;
    shopName: string;
    price: number;
}

export interface GetDailyCountResponse {
    count: number;
    income: number;
    localDate: string;
}
